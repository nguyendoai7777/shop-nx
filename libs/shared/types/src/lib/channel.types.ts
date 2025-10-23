import { BaseRecord } from './common.types.js';
import type { RegisterProChannel } from '@shop/dto';

export interface ExternalLinkResponseSchema {
  id: number;
  shortname: string;
  url: string;
  avatarUrl?: string;
}

export interface Channel extends BaseRecord {
  followers: number;
  description: string;
  externalLinks: ExternalLinkResponseSchema[];
  minReceive?: number;
}

export interface ChannelResponseSchema {
  id: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  userId: number;
  followers: number;
  description: string | null;
}

export interface RegisterChannelResponse {
  channel: string;
  verified: boolean;
  channelRef: Channel;
}

export interface SettingInfoRequestBody {
  channel: string;
  externalLinks: Pick<ExternalLinkResponseSchema, 'shortname' | 'url'>[];
  description: string;
  minReceive?: number;
}

export interface RegisterChannelReqBody extends RegisterProChannel {}
