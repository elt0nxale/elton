'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from "@/components/Layout";
import { ConfettiTimer } from './ConfettiTimer';

const paragraphClasses = "mt-6 text-lg leading-8 text-gray-900 dark:text-gray-300 text-start";

export default function Homepage() {
    const graduationDate = new Date('2024-12-02 15:00');
    const [seconds, setSeconds] = useState(Math.floor((Date.now() - graduationDate.getTime()) / 1000));

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
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
                    Hey 👋 I&apos;ve <ConfettiTimer word={"recently"} seconds={seconds}/> completed my bachelor&apos;s in Information Systems and jumped right into a full-time role (yay).
                </p>
                <p className={paragraphClasses}>
                    Graduating early was always a priority for me because
                </p>
                <ol className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-400 text-start list-decimal list-inside">
                    <li>School fees are <b>expensive</b>.</li>
                    <li>Internships gave a more practical learning experience rather than over-emphasizing on superficial measures.</li>
                </ol>
                <p className={paragraphClasses}>
                    p.s my github grassfields haven&apos;t been watered enough the past year or so — I&apos;d like to apologize to myself for that... and also conveniently slide in the excuse of having too many things going on outside of the keyboard.
                </p>
                <p className={paragraphClasses}>
                    Now that there&apos;s more time without school commitments, I&apos;d like to better spend it on things like updating my <Link href="/blog" className="underline font-bold">blog</Link>, poking around cool stuff, and officially embark on autodidacticism.
                </p>
            </div>
        </Layout>
    );
}
