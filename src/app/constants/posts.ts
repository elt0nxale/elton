import path from 'path';

export const WORDS_PER_MINUTE = 265;
export const SECONDS_PER_IMAGE = 12;
export const POST_DATE_FORMAT = 'MMMM dd, yyyy';

export const postsDirectory = path.join(process.cwd(), 'posts');

// CACHE
export const SESSION_POST_TTL = 60 * 60 * 1000; // milliseconds
export const CDN_POST_TTL = 600; // minutes 
export const CDN_POST_STALE_WHILE_REVALIDATE_TTL = 200; // minutes 

// DEBOUNCE
export const DEBOUNCE_DELAY = 1000;
