import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { PostAuthor } from './PostAuthor';
import { ReactionButtons } from './ReactionButtons';
import { TimeAgo } from './TimeAgo';

export const PostsList = () => {
    const posts = useAppSelector((state) => state.posts);

    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    const renderedPosts = orderedPosts.map((post) => (
        <article className='post-excerpt' key={post.id}>
            <h3>{post.title}</h3>
            <p className='post-content'>{post.content.substring(0, 100)}</p>
            <Link to={`/posts/${post.id}`} className="button mutted-button">
                View Post
            </Link>
            <PostAuthor userId={post.userId}/>
            <TimeAgo timestamp={post.date}/>
            <ReactionButtons post={post}/>
        </article>
    ));

    return (
        <section className='posts-list'>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    );
};
