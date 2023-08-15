import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const json = await req.json();
    console.log(json.username);
    return NextResponse.json({});
}
