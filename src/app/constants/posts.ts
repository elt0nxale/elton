import path from 'path';

export const WORDS_PER_MINUTE = 265;
export const SECONDS_PER_IMAGE = 12;
export const POST_DATE_FORMAT = 'MMMM dd, yyyy';

export const postsDirectory = path.join(process.cwd(), 'posts');
export const cacheFile = path.join(process.cwd(), '.cache', 'posts-metadata.json');