import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PostAuthor } from './PostAuthor';
import { selectAllPosts, fetchPosts } from './postsSlice';
import { ReactionButtons } from './ReactionButtons';
import { TimeAgo } from './TimeAgo';
import { PostType } from './types';

const PostExcerpt = React.memo(({
    post,
    ...props
}: {
    post: PostType,
    key: string,
}) => {
    return <article className='post-excerpt' {...props}>
        <h3>{post.title}</h3>
        <p className='post-content'>{post.content.substring(0, 100)}</p>
        <Link to={`/posts/${post.id}`} className="button mutted-button">
            View Post
        </Link>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />
    </article>
})

export const PostsList = () => {
    const dispatch = useAppDispatch();

    const posts = useAppSelector(selectAllPosts);
    const postsStatus = useAppSelector(state => state.posts.status);
    const error = useAppSelector(state => state.posts.error);

    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postsStatus, dispatch]);
    
    let content;

    if (postsStatus === 'loading') {
        content = <div className="loader">Loading...</div>
    } else if (postsStatus === 'succeeded') {
        const orderedPosts = posts
            .slice()
            .sort((a, b) => {
                return b.date.localeCompare(a.date)
            })
        content = orderedPosts.map(post => (
            <PostExcerpt post={post} key={post.id}/>
        ))
    } else if (postsStatus === 'failed') {
        content = <div>{error}</div>   
    }

    return (
        <section className='posts-list'>
            <h2>Posts</h2>
            {content}
        </section>
    );
};
