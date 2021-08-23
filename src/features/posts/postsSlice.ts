import { createSlice, PayloadAction, createSelector, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { RootState } from "../../app/store";
import { reactionEmoji } from "./ReactionButtons";

import { PostType } from "./types";


type CommonType<T, K extends string[] = []> = Omit<
  T,
  "date" | "reactions" | K[number]
> & {
  reactions?: {
    [key in keyof typeof reactionEmoji]?: number;
  };
};
type PostAddedPrepareType = CommonType<PostType, ["id"]>;
type PostUpdatedType = CommonType<PostType, ["user"]>;
type ReactionAddedType = {
  reaction: keyof typeof reactionEmoji;
  postId: string;
};

const postAdapter = createEntityAdapter({
	sortComparer: (a: PostType, b: PostType) => b.date.localeCompare(a.date)
});


const initialState = postAdapter.getInitialState({status: 'idle', error: null} as {
	status: string,
	error: null | string | undefined
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts');
    return response.posts;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost: PostAddedPrepareType): Promise<PostType> => {
	const response = await client.post('/fakeApi/posts', {
		post: initialPost
	});
	return response.post;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postUpdated: (state, action: PayloadAction<PostUpdatedType>) => {
      const { id, title, content } = action.payload;
      const existingPost = state.entities[id]

      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded: (state, action: PayloadAction<ReactionAddedType>) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];
      if (existingPost?.reactions) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: builder => builder 
    .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
    })
    .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        postAdapter.upsertMany(state, action.payload);
    })
    .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
    })
	.addCase(addNewPost.fulfilled, (state, action) => {
		postAdapter.addOne(state, action.payload);
	})
});

export const { postUpdated, reactionAdded } = postsSlice.actions;

export const {
	selectAll: selectAllPosts,
	selectById: selectPostById,
	selectIds: selectPostIds
} = postAdapter.getSelectors((state: RootState) => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state: RootState, userId: string) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
);

export default postsSlice.reducer;
