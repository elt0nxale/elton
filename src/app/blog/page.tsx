"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

interface PostData {
    id: string;
    title: string;
    date: string;
    readTime: string;
  }

export default function Blog() {
    const [posts, setPosts] = useState<PostData[]>([]);

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch('/api/posts');
            const data = await response.json();
            setPosts(data);
        }
    fetchPosts();
    }, []);

    return (
        <Layout>
          <div className="blog-page">
            <p className="mt-6 mb-12 text-lg leading-8 text-gray-400 text-start italic">
                Attempting to improve my writing skills and hopefully reflecting on the things i wanted to remember as i come across them in my journey.
            </p>
            <ul>
                {posts.map(({ id, title, date, readTime }) => (
                    <li key={id} className="mb-6">
                    <Link href={`/blog/${id}`}>
                    {title}
                    </Link>
                    <p className="text-gray-500">{date} • {readTime}</p>
                </li>
                ))}
            </ul>
          </div>
        </Layout>
    );
}