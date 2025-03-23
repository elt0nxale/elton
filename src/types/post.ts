export interface PostData {
    metadata: PostMetadata;
    contentHtml: string;
}

export interface PostMetadata {
    id: string;
    title: string;
    date: string;
    readTime: string;
}

export interface PostMetadataCache {
  [key: string]: PostMetadata;  
}