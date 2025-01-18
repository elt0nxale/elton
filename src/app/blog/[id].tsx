import { getAllPostIds, getPostData } from '@/lib/posts';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { remark } from 'remark';
import html from 'remark-html';

interface PostProps {
  postData: {
    title: string;
    date: string;
    readTime: string;
    contentHtml: string;
  };
}

export default function Post({ postData }: PostProps) {
  return (
    <div className="container mx-auto px-6 lg:px-8 max-w-3xl py-8">
      <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
      <p className="text-gray-500 mb-4">{postData.date} • {postData.readTime}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params!.id as string);
  return {
    props: {
      postData,
    },
  };
};