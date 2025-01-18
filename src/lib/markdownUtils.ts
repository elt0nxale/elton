import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
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

export async function getPostMetadata(id: string, includeContent = false): Promise<PostMetadata> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const fileStats = fs.statSync(fullPath);
  const matterResult = matter(fileContents);
  
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();
  
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