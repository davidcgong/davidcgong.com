import React, { useRef, useEffect, useState } from 'react';
import TextScroll from 'react-textscroll';
import styles from './Page.module.scss';

type Props = {
  title?: string,
  children: React.Node
};

const Page = ({ title, children }: Props) => {
  const pageRef = useRef();

  useEffect(() => {
    pageRef.current.scrollIntoView();
  });
  const [jsonObject, setjsonObject] = useState([]);
  const [newsFetched, setnewsFetched] = useState(false);
  // kinda redundant but I might think of doing something else with other json objects
  const [newsText, setnewsText] = useState([])
    // mapping objects so it is displayed as list 

  const fetchNews = () => {
      var xhr = new XMLHttpRequest();
      var article = null;
      var json_obj, status = false;
      xhr.open("GET", "https://newsapi.org/v2/everything?q=tsla+jpm&from=2019-05-06&sortBy=publishedAt&apiKey=77c5f72850a24c0abff5d4fc6edcf391", true);
      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var json_obj = JSON.parse(xhr.responseText);
            var articles = json_obj.articles
            var payload = []
            // just for titles, will delete if becomes more sophisticated
            var titlePayload = []
            // use for seeing how articles are displayed in terms of formatting
            console.log(articles);
            for (var i = 0; i < articles.length; i++) {
              var anObject = {
                author: articles[i].author,
                title: articles[i].title
              }
              titlePayload.push(anObject.title)
              payload.push(anObject)      
            }
            // setting jsonObject = payload doesn't work, so we have to concat or create a copy
            setnewsFetched(true)
            setjsonObject(jsonObject.concat(payload));
            status = true;
          } else {
            console.error(xhr.statusText);
          }
        }
      }.bind(this);
      xhr.onerror = function (e) {
        console.error(xhr.statusText);
      };
      xhr.send(json_obj);
  }

  if (!newsFetched) {
    fetchNews();
  }

  

  return (
    <div ref={pageRef} className={styles['page']}>
      <TextScroll
        mode='horizontal'
        text={newsText}
        speed={1000}
      />
      
      <div className={styles['page__inner']}>
        { title && <h1 className={styles['page__title']}>{title}</h1>}
        <div className={styles['page__body']}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Page;