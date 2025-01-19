import { getAllPosts } from '@/lib/markdownUtils';

export async function GET() {
  const allPosts = await getAllPosts();
  return Response.json(allPosts);
}