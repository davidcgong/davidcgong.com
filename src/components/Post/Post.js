// @flow
import React, { Component } from 'react';
import { Link } from 'gatsby';
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
// import Subscription from '../Subscription';
// import SubscriptionPopup from '../SubscriptionPopup';
import styles from './Post.module.scss';
import Spotify from '../Spotify'
import type { Node } from '../../types';

type Props = {
  post: Node
};

const Post = ({ post }: Props) => {
  const { html } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date } = post.frontmatter;
  

  return (
    <div className={styles['post']}>
      {/* <SubscriptionPopup /> */}
      <Link className={styles['post__home-button']} to="/">All Posts</Link>
      <div className={styles['post__content']}>
        <Content body={html} date={date} title={title} />
      </div>

      <div className={styles['post__footer']}>
      <a href="#">Back to the top.</a>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        {/* <Subscription /> */}
        <Author />
      </div>
      <div className={styles['post__comments']}>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div>
    </div>
  );
};

export default Post;
