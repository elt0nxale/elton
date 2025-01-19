"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { FadeLoader } from 'react-spinners';
import { PostData } from '@/types';

export default function Blog() {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            const response = await fetch('/api/posts');
            const data = await response.json();
            setPosts(data);
            setLoading(false);
        }
        fetchPosts();
    }, []);

    return (
        <Layout>
          <div className="blog-page px-5">
            <p className="mt-6 mb-12 text-lg leading-8 dark:text-gray-400 text-gray-500 text-start italic">
                Attempting to improve my writing and (hopefully) reflect on the things I wanted to remember as I come across them in this journey.
            </p>
            {loading ? (
                <div className="flex justify-center items-center p-4 mt-20">
                    <FadeLoader 
                        color={'#9CA3AF'}
                        height={12}
                        radius={1}
                        speedMultiplier={1.25}
                    />
                </div>
            ) : (
                posts.length === 0 ? (
                    <p className="text-gray-900 dark:text-gray-400">Not a single post has been written yet 😰</p>
                ) : (
                    <ul>
                        {posts.map(({ metadata }) => (
                            <li key={metadata.id} className="mb-6">
                                <Link href={`/blog/${metadata.id}`} className="text-gray-900 dark:text-gray-100 font-medium">
                                    {metadata.title}
                                </Link>
                                <p className="text-gray-900 dark:text-gray-400">{metadata.date} • {metadata.readTime}</p>
                            </li>
                        ))}
                    </ul>
                )
            )}
          </div>
        </Layout>
    );
}