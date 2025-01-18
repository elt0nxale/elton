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

const WORDS_PER_MINUTE = 265;
const SECONDS_PER_IMAGE = 12;
const postsDirectory = path.join(process.cwd(), 'posts');

interface PostMetadata {
  id: string;
  title: string;
  date: string;
  readTime: string;
  contentHtml?: string;
}

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
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeHighlight)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(content);

  return processedContent.toString();
}

export async function getPostMetadata(id: string, includeContent = false): Promise<PostMetadata> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const fileStats = fs.statSync(fullPath);
  const matterResult = matter(fileContents);
  
  const contentHtml = await processMarkdown(matterResult.content);
  
  return {
    id,
    title: matterResult.data.title,
    date: format(fileStats.mtime, 'dd MMM yyyy'),
    readTime: calculateReadTime(contentHtml),
    ...(includeContent && { contentHtml })
  };
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = await Promise.all(
    fileNames.map(fileName => {
      const id = fileName.replace(/\.md$/, '');
      return getPostMetadata(id);
    })
  );
  return allPosts;
}