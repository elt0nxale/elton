import { POST_DATE_FORMAT, REDIS_POST_TTL, SECONDS_PER_IMAGE, WORDS_PER_MINUTE, postsDirectory } from '@/app/constants/posts';
import { PostData, PostMetadata } from '@/types';
import { format } from 'date-fns';
import { readFile, readdir } from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { getRedisClient } from './redis';


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

export async function getPostData(id: string): Promise<PostData> {
  try {
    const redis = await getRedisClient();
    const cacheKey = `blog-post-${id}`;

    const cachedPost = await redis.get(cacheKey);
    if (cachedPost) {
      return JSON.parse(cachedPost);
    }

    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = await readFile(fullPath, 'utf-8');
    const matterResult = matter(fileContents);
    
    const [metadata, contentHtml] = await Promise.all([
      createPostMetadata(id, matterResult),
      processMarkdown(matterResult.content)
    ]);

    const postData = { metadata, contentHtml };

    await redis.set(cacheKey, JSON.stringify(postData), {
      EX: REDIS_POST_TTL
    });

    return postData;
  } catch (error) {
    console.error(`Error getting post data for ${id}:`, error);
    throw error;
  }
}

export async function getAllPostMetadata(): Promise<PostMetadata[]> {
  try {
    const redis = await getRedisClient();
    const cacheKey = `posts-metadata`
    const cachedPostsMetadata = await redis.get(cacheKey);
    if (cachedPostsMetadata) {
      return JSON.parse(cachedPostsMetadata);
    }

    const fileNames = await readdir(postsDirectory, 'utf-8');
    const postsMetadata = await Promise.all(
      fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        return getPostMetadata(id);
      })
    );

    const sortedPostsMetadata = postsMetadata.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    await redis.set(cacheKey, JSON.stringify(sortedPostsMetadata), {
      EX: REDIS_POST_TTL
    });
    
    return sortedPostsMetadata;
  } catch (error) {
    console.error('Error getting all post metadata:', error);
    throw error;
  }
}

export async function getPostMetadata(id: string): Promise<PostMetadata> {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = await readFile(fullPath, 'utf-8');
    const matterResult = matter(fileContents);
    
    const metadata = await createPostMetadata(id, matterResult);
    
    return metadata;
  } catch (error) {
    console.error(`Error getting post metadata for ${id}:`, error);
    throw error;
  }
}