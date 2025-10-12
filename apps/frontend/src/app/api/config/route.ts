import { NextResponse } from 'next/server';
import { loadConfig } from '@server/utils';

export async function GET() {
  return NextResponse.json(loadConfig());
}
