// @flow
import React from 'react';
import moment from 'moment';
import styles from './Content.module.scss';

type Props = {
  body: string,
  date: string,
  title: string
};

const Content = ({ body, date, title }: Props) => (
  <div className={styles['content']}>
    <h1 className={styles['content__title']}>{title}</h1>
    <p className={styles['content__date']}>{moment(date).format('MMM D YYYY')}</p>
    <div className={styles['content__body']} dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

export default Content;
