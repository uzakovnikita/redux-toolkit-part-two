import { useAppSelector } from '../../app/hooks';

export const PostAuthor = ({ userId }: { userId: string }) => {
    const author = useAppSelector((state) =>
        state.users.find(({ id }) => id === userId),
    );
    return (
        <span>
            by {author ? author.name : 'Unknown author'}
        </span>
    )
};
