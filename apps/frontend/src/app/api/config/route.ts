import { NextResponse } from 'next/server';
import { loadConfig } from '@utils';

export async function GET() {
  return NextResponse.json(loadConfig())
}