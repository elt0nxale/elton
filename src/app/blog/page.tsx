import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export default function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="blog-page container py-12">
      <p className="mt-6 mb-12 text-lg leading-8 text-gray-400 text-start italic">
        Attempting to improve my writing skills and hopefully reflecting on the things i wanted to remember as i come across them in my journey.
      </p>
      <ul>
        {allPostsData.map(({ id, title, date, readTime }) => (
          <li key={id} className="mb-6">
            <Link href={`/blog/${id}`}>
              {title}
            </Link>
            <p className="text-gray-500">{date} • {readTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}