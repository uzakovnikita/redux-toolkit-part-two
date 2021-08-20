import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import { reactionEmoji } from './ReactionButtons';

import { PostType } from './types';

const initialReactions = {
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
}

const initialState = [
    {
        id: '1',
        title: 'First post',
        content: 'Hello',
        userId: '1',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {...initialReactions}
    },
    {
        id: '2',
        title: 'Second post',
        content: 'More text',
        userId: '0',
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {...initialReactions},
    },
];

type CommonType<T, K extends string[] = []> = Omit<
    T,
    'date' | 'reactions' | K[number]
> & {
    reactions?: {
        [key in keyof typeof reactionEmoji]?: number;
    };
};
type PostAddedPrepareType = CommonType<PostType, ['id']>;
type PostUpdatedType = CommonType<PostType, ['userId']>;
type ReactionAddedType = {
    reaction: keyof typeof reactionEmoji,
    postId: string,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action: PayloadAction<PostType>) {
                state.push(action.payload);
            },
            prepare<T extends PostAddedPrepareType>(payload: T) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        reactions: {...initialReactions},
                        ...payload,
                    },
                };
            },
        },
        postUpdated: (state, action: PayloadAction<PostUpdatedType>) => {
            const { id, title, content } = action.payload;
            const existingPost = state.find((post) => post.id === id);

            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        },
        reactionAdded: (state, action: PayloadAction<ReactionAddedType>) => {
            const { postId, reaction } = action.payload;
            const existingPost = state.find(post => post.id === postId);
            if (existingPost?.reactions) {
                existingPost.reactions[reaction]++
            }
        },
    },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
