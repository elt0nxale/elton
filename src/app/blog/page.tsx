"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { FadeLoader } from 'react-spinners';
import { PostMetadata } from '@/types';
import { ExternalLink } from 'lucide-react';
import SessionCache from '@/lib/SessionCache';


export default function Blog() {
    const [postMetadata, setPostMetadata] = useState<PostMetadata[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const POSTS_CACHE_KEY = 'blog-posts-metadata';

    useEffect(() => {
        async function fetchPostsMetadata() {
            setLoading(true);
            try {
                const cachedMetadata = SessionCache.get<PostMetadata[]>(POSTS_CACHE_KEY);
                if (cachedMetadata) {
                    console.log(`${POSTS_CACHE_KEY} found in session, skipping api call`)
                    setPostMetadata(cachedMetadata);
                    setLoading(false);
                    return;
                }

                const response = await fetch('/api/posts');
                const data = await response.json();

                setPostMetadata(data);
                SessionCache.set(POSTS_CACHE_KEY, data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
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
                postMetadata.length === 0 ? (
                    <p className="text-gray-900 dark:text-gray-400">Not a single post has been written yet 😰</p>
                ) : (
                    <ul>
                        {postMetadata.map(({ id, title, date, readTime}) => (
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