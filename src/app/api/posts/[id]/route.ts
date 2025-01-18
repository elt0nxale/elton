import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { format } from 'date-fns';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = await Promise.resolve(params.id);
        const fullPath = path.join(postsDirectory, `${id}.md`);

        if (!fs.existsSync(fullPath)) {
            return Response.json(
            { error: 'Post not found' },
            { status: 404 }
            );
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const fileStats = fs.statSync(fullPath);
        const lastModified = format(fileStats.mtime, 'dd MMM yyyy');
        const matterResult = matter(fileContents);
        const processedContent = await remark().use(html).process(matterResult.content);
        const contentHtml = processedContent.toString();
        const readTime = calculateReadTime(contentHtml);

        const postData = {
            id: id,
            contentHtml,
            title: matterResult.data.title,
            date: lastModified,
            readTime: readTime,
        };

        return Response.json(postData);
    } catch (error) {
        console.error('Error fetching post:', error);
        return Response.json(
          { error: 'Internal Server Error' },
          { status: 500 }
        );
      }
}