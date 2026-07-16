'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from "@/components/Layout";
import { ConfettiTimer } from './ConfettiTimer';

const paragraphClasses = "mt-6 text-lg leading-8 text-gray-900 dark:text-gray-300 text-start";

export default function Homepage() {
    const graduationDate = new Date('2024-12-02 15:00');
    const [days, setDays] = useState(Math.floor((Date.now() - graduationDate.getTime()) / (1000 * 60 * 60 * 24)));

    useEffect(() => {
        const interval = setInterval(() => {
            setDays(prevSeconds => prevSeconds + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Layout>
            <div className="about-page px-5 text-center py-7">
                <div className="flex flex-col items-start">
                    <div className="flex flex-col gap-3 items-start">
                        <h1 className="text-3xl font-bold">Elton</h1>
                        <h4 className="text-lg">⚙️ Software Engineer</h4>
                    </div>
                </div>
                <p className={paragraphClasses}>
                    Hey 👋 I completed my bachelor&apos;s in Information Systems <ConfettiTimer word={"some time ago"} days={days}/> and have started to embrace the 9-5 lifestyle.
                </p>
                <p className={paragraphClasses}>
                    While in university, graduating early was always a priority for me because
                </p>
                <ol className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-400 text-start list-decimal list-inside">
                    <li>School fees are <b>expensive</b>.</li>
                    <li>Internships gave a more practical learning experience rather than over-emphasizing on superficial measures.</li>
                </ol>
                <p className={paragraphClasses}>
                    Unfortunately, my github grassfields still haven&apos;t been watered enough since starting fulltime — I&apos;d like to apologize to myself for the lack of discipline... and also conveniently slide in the excuse of having too much going on outside of the keyboard. 
                </p>
                <p className={paragraphClasses}>
                    Presumably with more time without academic commitments and a fixed work schedule, I&apos;d hope to spend more time on reading, writing this <Link href="/blog" className="underline font-bold">blog</Link>, and learn to become an autodidact. 
                </p>
            </div>
        </Layout>
    );
}
