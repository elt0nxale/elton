import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import { format } from 'date-fns';
import { PostMetadata, PostData } from '@/types';
import { WORDS_PER_MINUTE, SECONDS_PER_IMAGE, POST_DATE_FORMAT, postsDirectory, cacheFile } from '@/app/constants/posts';

const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings)
  .use(rehypeHighlight)
  .use(rehypeKatex)
  .use(rehypeStringify);

const readFile = (filePath: string) => fs.readFileSync(filePath, 'utf8');

function calculateReadTime(content: string): string {
  const stripHtml = content.replace(/<[^>]*>/g, '');
  const words = stripHtml.trim().split(/\s+/).length;
  const imageMatches = content.match(/<img[^>]*>/g);
  const imageCount = imageMatches ? imageMatches.length : 0;
  
  const readingTimeMinutes = words / WORDS_PER_MINUTE;
  const imageTimeMinutes = (imageCount * SECONDS_PER_IMAGE) / 60;
  const totalMinutes = Math.ceil(readingTimeMinutes + imageTimeMinutes);
  
  return totalMinutes < 1 ? "< 1 min read" : 
         totalMinutes === 1 ? "1 min read" : 
         `${totalMinutes} min read`;
}

async function processMarkdown(content: string): Promise<string> {
  const result = await markdownProcessor.process(content);
  return result.toString();
}

async function createPostMetadata(id: string, matterResult: matter.GrayMatterFile<string>): Promise<PostMetadata> {
  return {
    id,
    title: matterResult.data.title,
    date: format(matterResult.data.date, POST_DATE_FORMAT),
    readTime: calculateReadTime(matterResult.content)
  };
}

export async function getAllPostMetadata(): Promise<PostMetadata[]> {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = await Promise.all(
      fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        return getPostMetadata(id);
      })
    );

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error getting all post metadata:', error);
    throw error;
  }
}

export async function getPostData(id: string): Promise<PostData> {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = readFile(fullPath);
    const matterResult = matter(fileContents);
    
    const [metadata, contentHtml] = await Promise.all([
      createPostMetadata(id, matterResult),
      processMarkdown(matterResult.content)
    ]);

    return { metadata, contentHtml };
  } catch (error) {
    console.error(`Error getting post data for ${id}:`, error);
    throw error;
  }
}

export async function getPostMetadata(id: string): Promise<PostMetadata> {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = readFile(fullPath);
    const matterResult = matter(fileContents);
    
    const metadata = await createPostMetadata(id, matterResult);
    
    return metadata;
  } catch (error) {
    console.error(`Error getting post metadata for ${id}:`, error);
    throw error;
  }
}