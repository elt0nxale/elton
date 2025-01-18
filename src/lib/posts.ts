import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { format, parseISO } from 'date-fns';

const postsDirectory = path.join(process.cwd(), 'posts');

const formatDate = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, 'dd MMM yyyy'); 
};

interface PostData {
  id: string;
  title: string;
  date: string;
  readTime: string;
}

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      date: formatDate(matterResult.data.date),
      readTime: matterResult.data.readTime,
    };
  });

  return allPostsData.sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    date: formatDate(matterResult.data.date),
    readTime: matterResult.data.readTime,
  };
}