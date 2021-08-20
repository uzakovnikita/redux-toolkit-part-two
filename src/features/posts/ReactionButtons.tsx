import { useAppDispatch } from '../../app/hooks';
import { reactionAdded } from './postsSlice';
import { PostType } from './types';

export const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀',
};

export const ReactionButtons = ({ post }: { post: PostType }) => {
    const dispatch = useAppDispatch();
    const reactionButtons = Object.entries(reactionEmoji).map(
        ([name, emoji]) => {
            return (
                <button
                    key={name}
                    type='button'
                    className='muted-button reaction-button'
                    onClick={() =>
                        dispatch(
                            reactionAdded({ reaction: name as keyof typeof reactionEmoji, postId: post.id }),
                        )
                    }
                >
                    {emoji} {post.reactions[name as keyof typeof reactionEmoji]}
                </button>
            );
        },
    );
    return <div>{reactionButtons}</div>;
};
