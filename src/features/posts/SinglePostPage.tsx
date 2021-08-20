import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { PostAuthor } from './PostAuthor';
import { RouterParamsType } from './types';

export const SinglePostPage = ({
    match,
}: RouterParamsType) => {
    const { postId } = match.params;

    const post = useAppSelector((state) =>
        state.posts.find(({ id }) => postId === id),
    );

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    return (
        <section>
            <article className='post'>
                <h2>{post.title}</h2>
                <p className='post-content'>{post.content}</p>
                <Link to={`/editPost/${post.id}`} className="button">
                    Edit Post
                </Link>
                <PostAuthor userId={post.userId}/>
            </article>
        </section>
    );
};
