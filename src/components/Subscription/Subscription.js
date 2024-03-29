import React from 'react';
import styles from './Subscription.module.scss';

const Subscription = () => {
    return (
        <div className={styles['subscription']}>
            <span className={styles['subscription__blurb']}>Feel free to reach out to me about <a href="mailto:davidcgong@gmail.com"><b>davidcgong@gmail.com</b></a> about anything! I'd love to help or talk.</span>
            {/* <form
                className={styles['subscription__form']}
                action="https://gmail.us20.list-manage.com/subscribe/post?u=82ca3563c97ee7664b6d610c0&amp;id=9a3481cd54"
                method="post"
                target="_blank"
            >
                <input type="hidden" name="u" value="7cd5089a9bbc5253e6890ae15" />
                <input type="hidden" name="id" value="9f367a1f47" />
                <input
                    className={styles['subscription__form-email']}
                    type="email"
                    autoCapitalize="off"
                    autoCorrect="off"
                    name="MERGE0"
                    size="25"
                    placeholder="example@domain.com"
                    aria-label="Email Address"
                // onKeyDown={onKeyDown}
                />
                <br />
                <input className={styles['subscription__form-submit']} type="submit" name="submit" value="SUBSCRIBE" />
            </form> */}

        </div>
    );
};

export default Subscription;
