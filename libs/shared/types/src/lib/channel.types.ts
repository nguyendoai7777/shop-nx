import { BaseRecord } from './common.types.js';

interface ExternalLink extends BaseRecord{
  shortname?: string
  url: string
}

export interface Channel extends BaseRecord{
  followers: number
  description: string
  externalLinks: ExternalLink[]
}

export interface RegisterChannelResponse {
  channel: string
  verified: boolean
}