import { getPostMetadata } from '@/lib/markdownUtils';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!params?.id) {
      return Response.json({ error: 'Missing post ID' }, { status: 400 });
    }

    const post = await getPostMetadata(params.id, true);
    return Response.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}