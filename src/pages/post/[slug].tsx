/* eslint-disable prettier/prettier */
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Header from '../../components/Header';


interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>Space Traveling</title>
      </Head>
      <Header />
      <div className={styles.banner}>
        <img src={post.data.banner.url} alt="" />
      </div>
      <div className={styles.headerContainer}>
        <h1>
          {post.data.title}
        </h1>

        <div className={styles.authorInfo}>
          <div className={styles.authorContainer}>
            <AiOutlineCalendar />
            <p>11 jan 2021</p>
          </div>
          <div className={styles.authorContainer}>
            <BsPerson />
            <p>{post.data.author}</p>
          </div>
          <div className={styles.authorContainer}>
            <AiOutlineClockCircle />
            <p>5min</p>
          </div>
        </div>
      </div>
      <div className={styles.postContent}>
        {post.data.content.map((content) => {
          return (
            <article key={content.heading}>
              <h2>{content.heading}</h2>
              <div
                className={styles.postContent}
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(content.body),
                }}
              />
            </article>
          )
        })}
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(Prismic.predicates.at['type.publication']);

  const paths = posts.results.map(post => {
    return {
      params: { slug: post.uid },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();

  const response = await prismic.getByUID(
    'publication',
    String(slug),
    {}
  );


  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url || null,
      },
      author: response.data.author,
      content: [...response.data.content],
    },
  };


  return {
    props: {
      post,
    },
    revalidate: 60 * 30,
  }

};
