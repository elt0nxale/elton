import { getAllPostMetadata } from '@/lib/markdownUtils';
import { NextRequest } from 'next/server';

export async function GET(_request: NextRequest) {
  try {
    const posts = await getAllPostMetadata();
    return Response.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}