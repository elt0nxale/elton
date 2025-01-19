import { getPostData } from '@/lib/posts';
import { NextRequest } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const post = await getPostData(id);
    return Response.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
