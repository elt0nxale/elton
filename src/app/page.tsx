"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const graduationDate = new Date('2024-12-02 15:00');
  const [seconds, setSeconds] = useState(Math.floor((Date.now() - graduationDate.getTime()) / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
      <div className="relative isolate overflow-hidden">
        <div className="py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="flex flex-col items-start">
                <div className="mt-8 flex flex-col gap-3 items-start">
                  <h1 className="text-3xl font-bold">Elton</h1>
                  <h4 className="text-lg">Software Engineer / Site Reliability Engineer</h4>
                </div>
              </div>
                <p className="mt-6 text-lg leading-8 text-gray-300 text-start">
                Hey there. I've <em className="relative group">recently
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {seconds} seconds ago
                  </span>
                </em> completed my bachelor's in Information Systems in 3.5 years and about to start as a Site Reliability Engineer.
                </p>
              <p className="mt-6 text-lg leading-8 text-gray-300 text-start">
                Graduating early was always a priority for me because
              </p>
              <ol className="mt-6 text-lg leading-8 text-gray-500 text-start list-decimal list-inside">
                <li>School fees are <b>expensive</b>.</li>
                <li>Internships in my opinion provided a more practical learning experience rather than over-emphasizing on superficial measures.</li>
              </ol>
              <p className="mt-6 text-lg leading-8 text-gray-300 text-start">
                P.S, my GitHub grass fields haven't been watered enough the past year or so — I'd like to apologize to myself for that, and also conveniently slide in the excuse of having a life outside of the keyboard <em>(those who have both, don't come @ me)</em>.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300 text-start">
                Now that there's more time without school commitments, I'd like to better spend it on things like updating my <Link href="/blog" className="underline font-bold">blog</Link>, poking around cool stuff, and continue being autodidactic.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
