import { getPostData } from '@/lib/posts';
import { NextRequest, NextResponse } from 'next/server';
import { CDN_POST_STALE_WHILE_REVALIDATE_TTL, CDN_POST_TTL } from "@/app/constants/posts";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await getPostData(id);

    const response = NextResponse.json(post);
    response.headers.set('Cache-Control',`public, s-maxage=${CDN_POST_TTL}, stale-while-revalidate=${CDN_POST_STALE_WHILE_REVALIDATE_TTL}`)
    
    return response;
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
