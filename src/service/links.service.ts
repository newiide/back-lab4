import { Injectable } from '@nestjs/common';
import { LinkDto } from '../models/link.dto';
import { Links, LinksDoc } from '../schema/links.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { LinkNotFound, ExpiredLink, NoExpiration } from '../shared';

function setExpirationTime(days=0) {
  const today = new Date();
  return new Date(today.setDate(today.getDate() + days));
}

@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Links.name)
    private readonly linkModel: Model<LinksDoc>,
  ) {}

  async createLink(body: LinkDto & { email: string }) {
    const shorterLink = randomUUID().slice(0, -12);
    const days = 5;
    const expiredAt = setExpirationTime(days);
    const doc = new this.linkModel({
      ...body, originalLink: body.originalLink, shortLink: shorterLink, expiredAt: expiredAt,
    });
    const links = await doc.save();

    return links;
  }

  async getExpired(query, user) {
    const data = JSON.parse(query.expiredAt);

    if (!data.gt && !data.lt) {
      throw new NoExpiration('There is any expiration date')}
    if (data.gt && data.lt) {
      const ltAndGtExpirationDate = await this.linkModel.aggregate([
        {
          $match: {
            email: user.email,
            expiredAt: { $gt: new Date(data.gt), $lt: new Date(data.lt) }
          },
        },
      ]);
      return ltAndGtExpirationDate 
    }
    if (data.gt) {
      const gtExpirationDate = await this.linkModel.aggregate([
        {
          $match: {
            email: user.email,
            expiredAt: { $gt: new Date(data.gt) },
          },
        },
      ]);
      return gtExpirationDate
    }
    if (data.lt) {
      const ltExpirationDate = await this.linkModel.aggregate([
        {
          $match: {
            email: user.email,
            expiredAt: { $lt: new Date(data.lt) },
          },
        },
      ]);
      return ltExpirationDate
    }
  }

  async getLink(cut) {
    const longLink = await this.linkModel.findOne({ shortLink: cut });
    const today = setExpirationTime();
    if (longLink.expiredAt < today) {
      throw new ExpiredLink('Link was expired')}
    if (!longLink) {
      throw new LinkNotFound('Shorter link was not found');}
    return longLink.originalLink;
  }
}
