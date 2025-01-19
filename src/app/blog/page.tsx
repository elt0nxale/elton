"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { FadeLoader } from 'react-spinners';
import { PostMetadata } from '@/types';
import { ExternalLink } from 'lucide-react';

export default function Blog() {
    const [posts, setPosts] = useState<PostMetadata[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchPostsMetadata() {
            setLoading(true);
            const response = await fetch('/api/posts');
            const data = await response.json();
            setPosts(data);
            setLoading(false);
        }
        fetchPostsMetadata();
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
                        {posts.map(({ id, title, date, readTime}) => (
                            <li key={id} className="mb-6">
                                <Link 
                                    href={`/blog/${id}`} 
                                    className="flex items-center gap-2 group hover:text-gray-600 dark:hover:text-gray-300 hover:underline"
                                >
                                    <span className="text-gray-900 dark:text-gray-100 font-medium">
                                        {title}
                                    </span>
                                    <ExternalLink 
                                        className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" 
                                        aria-hidden="true"
                                    />
                                </Link>
                                <p className="text-gray-900 dark:text-gray-400">{date} • {readTime}</p>
                            </li>
                        ))}
                    </ul>
                )
            )}
          </div>
        </Layout>
    );
}