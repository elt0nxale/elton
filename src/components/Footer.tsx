'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import { email, githubUrl, linkedinUrl } from '@/app/constants/footer';

export default function Footer() {
  return (
    <footer className="container mx-auto px-6 lg:px-8 max-w-3xl pb-8">
      <hr/>
      <div className="mt-16 mb-20 grid grid-cols-12 gap-2">
        <div className="col-span-12 ms-6">
          <a 
            href={githubUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm no-underline transition-all hover:text-green-400"
          >
            <Github className="h-4 w-4" />
            @elt0nxale
          </a>
        </div>
        <div className="col-span-12 ms-6">
          <a 
            href={linkedinUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm no-underline transition-all hover:text-blue-400"
          >
            <Linkedin className="h-4 w-4" />
            Elton Tay
          </a>
        </div>
        <div className="col-span-12 ms-6">
          <a 
            href={`mailto:${email}`}
            className="flex items-center gap-3 text-sm no-underline transition-all hover:text-orange-300"
          >
            <Mail className="h-4 w-4" />
            {email}
          </a>
        </div>
      </div>
      <div className="mt-8">
        <small>{new Date().getFullYear()} © Elton Tay. All rights reserved.</small>
      </div>
    </footer>
  );
}