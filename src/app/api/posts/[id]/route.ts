import { getPostMetadata } from '@/lib/markdownUtils';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    
    if (!resolvedParams?.id) {
      return Response.json({ error: 'Resource is missing post ID' }, { status: 400 });
    }

    const post = await getPostMetadata(resolvedParams.id, true);
    return Response.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}