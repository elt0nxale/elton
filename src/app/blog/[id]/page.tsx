'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';

interface PostData {
  title: string;
  date: string;
  readTime: string;
  contentHtml: string;
}

export default function Post() {
  const params = useParams();
  const id = params?.id as string;

  const [postData, setPostData] = useState<PostData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = () => {
      setIsLoading(true);
      setError(null);
      
      fetch(`/api/posts/${id}`)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch post');
          return response.json();
        })
        .then(data => setPostData(data))
        .catch(err => setError(err.message))
        .finally(() => setIsLoading(false));
    };

    fetchPost();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!postData) return <div>No post found</div>;

  return (
    <Layout>
      <div className="post-page py-8">
        <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
        <p className="text-gray-500 mb-12">{postData.date} • {postData.readTime}</p>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </div>
    </Layout>
  );
}