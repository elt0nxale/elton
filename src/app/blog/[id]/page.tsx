'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import { FadeLoader } from 'react-spinners';
import { PostData } from '@/types';
import SessionCache from '@/lib/SessionCache';


export default function Post() {
  const params = useParams();
  const id = params?.id as string;

  const [postData, setPostData] = useState<PostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const POST_CACHE_KEY = 'blog-post-' + id;


  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const cached = SessionCache.get<PostData>(POST_CACHE_KEY);
        if (cached) {
          setPostData(cached);
          setIsLoading(false);
          return;
        }

        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) throw new Error('Failed to fetch post');
        const data = await response.json();

        SessionCache.set(POST_CACHE_KEY, data);
        setPostData(data);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading) return (
    <div className="flex justify-center items-center p-4 mt-20">
      <FadeLoader 
          color={'#4B5563'}
          height={12}
          radius={1}
          speedMultiplier={1.25}
      />
    </div>);
  if (error) return <div>Error: {error}</div>;
  if (!postData) return <div>No post found for this id</div>;

  return (
    <Layout>
      <div className="post-page py-8 px-5">
        <h1 className="text-4xl font-bold mb-4">{postData.metadata?.title}</h1>
        <p className="text-gray-500 mb-12">{postData.metadata?.date} • {postData.metadata?.readTime}</p>
        <div 
          className="
            prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold 
            prose-h1:text-3xl
            prose-h2:text-2xl 
            prose-h3:text-xl
            prose-p:text-gray-600 dark:prose-p:text-gray-300
            prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700
            prose-blockquote:pl-4 prose-blockquote:italic
            prose-ul:list-disc prose-ul:ml-4
            prose-ol:list-decimal prose-ol:ml-4
          "          
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
      </div>
    </Layout>
  );
}