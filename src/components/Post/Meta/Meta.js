// @flow
import React from 'react';
import moment from 'moment';
import styles from './Meta.module.scss';

type Props = {
  date: string
};

const Meta = ({ date }: Props) => (
  <div className={styles['meta']}>
    <p className={styles['meta__date']}>Published {moment(date).format('D MMM YYYY')}</p>
    <p className={styles['meta__date']}>Opinions expressed are solely my own and do not express the views or opinions of my employer or anyone else.</p>
  </div>
);

export default Meta;
