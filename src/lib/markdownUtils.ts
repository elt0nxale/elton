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
import { PostMetadata, PostData, PostMetadataCache} from '@/types';

const WORDS_PER_MINUTE = 265;
const SECONDS_PER_IMAGE = 12;
const postsDirectory = path.join(process.cwd(), 'posts');
const cacheFile = path.join(process.cwd(), '.cache', 'posts-metadata.json');

async function ensureCache() {
  if (!fs.existsSync(path.dirname(cacheFile))) {
    fs.mkdirSync(path.dirname(cacheFile), { recursive: true });
  }
  if (!fs.existsSync(cacheFile)) {
    fs.writeFileSync(cacheFile, '{}');
  }
}

async function getCachedMetadata(): Promise<PostMetadataCache> {
  await ensureCache();
  return JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
}

async function updateCache(id: string, metadata: PostMetadata) {
  const cache = await getCachedMetadata();
  const stats = fs.statSync(path.join(postsDirectory, `${id}.md`));
  
  cache[id] = {
    ...metadata,
    lastModified: stats.mtime.getTime(),
  };
  
  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
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

export async function getAllPostMetadata(): Promise<PostMetadata[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  
  const posts = await Promise.all(
    fileNames.map(async fileName => {
      const id = fileName.replace(/\.md$/, '');
      return getPostMetadata(id);
    })
  );

  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const fileStats = fs.statSync(fullPath);
  const contentHtml = await processMarkdown(matterResult.content);
  
  const metadata: PostMetadata = {
    id,
    title: matterResult.data.title,
    date: format(new Date(matterResult.data.date), 'MMMM dd, yyyy'),
    lastModified: fileStats.mtime.getTime(),
    readTime: calculateReadTime(matterResult.content)
  };
  
  return {
    metadata,
    contentHtml
  };
}

export async function getPostMetadata(id: string): Promise<PostMetadata> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const fileStats = fs.statSync(fullPath);
  const matterResult = matter(fileContents);
  
  const metadata: PostMetadata = {
    id,
    title: matterResult.data.title,
    date: format(new Date(matterResult.data.date), 'MMMM dd, yyyy'),
    lastModified: fileStats.mtime.getTime(),
    readTime: calculateReadTime(matterResult.content)
  };
  
  await updateCache(id, metadata);
  
  return metadata;
}