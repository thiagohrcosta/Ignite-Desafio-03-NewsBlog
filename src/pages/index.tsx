/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import Link from 'next/link';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { getPrismicClient } from '../services/prismic';

import styles from './home.module.scss';
import { formatDate } from '../helpers/date';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string | null;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

const Home = ({ postsPagination }: HomeProps) => {
  const { results, next_page } = postsPagination;
  const [posts, setPosts] = useState(results);
  const [nextPage, setNextPage] = useState(next_page);

  const pagination = nextPage => {
    fetch(nextPage)
      .then(response => response.json())
      .then(data => {
        const newPost = data.results.map(post => {
          return {
            uid: post.uid,
            first_publication_date: post.first_publication_date,
            data: {
              title: post?.data?.title,
              subtitle: post?.data?.subtitle,
              author: post?.data?.author,
            },
          };
        });
        setNextPage(data.next_page);
        setPosts([...posts, ...newPost]);
      });
  };

  return (
    <>
      <Head>
        <title>Home | News Challenge</title>
      </Head>
      <header className={styles.headerContainer}>
        <img src="/images/logo.svg" alt="logo" />
      </header>
      <main className={styles.container}>
        <div className={styles.postList}>
          {posts?.map(post => (
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a>
                <strong>{post?.data?.title}</strong>
                <p>{post.data.subtitle}</p>
                <div className={styles.infos}>
                  <div>
                    <FiCalendar />
                    <time>{formatDate(post.first_publication_date)}</time>
                  </div>
                  <div>
                    <FiUser />
                    <time>{post.data.author}</time>
                  </div>
                </div>
              </a>
            </Link>
          ))}
          {!!nextPage && (
            <button type="button" onClick={() => pagination(nextPage)}>
              Carregar mais posts
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'publication')],
    {
      fetch: [
        'publication.uid',
        'publication.title',
        'publication.subtitle',
        'publication.author',
        'publication.first_publication_date',
      ],
      pageSize: 2,
    }
  );

  console.log(response.results);

  const results = response.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post?.data?.title,
        subtitle: post?.data?.subtitle,
        author: post?.data?.author,
      },
    };
  });

  return {
    props: {
      postsPagination: {
        results,
        next_page: response.next_page,
      },
    },
    revalidate: 60 * 1, // 30 minutes
  };
};

export default Home;
