import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { postAdded } from './postsSlice';

export const AddPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.users);

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value);
    const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setContent(e.target.value);

    const onAuhtorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserId(e.target.value);
    }

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postAdded({ title, content, userId, reactions: {thumbsUp: 1} }));
        }
        setTitle('');
        setContent('');
    };

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

    const usersOptions = users.map(user => {
        return (
            <option key={user.id} value={user.id}>
                {user.name}
            </option>
        )
    })

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor='postTitle'>Post Title:</label>
                <input
                    type='text'
                    id='postTitle'
                    name='postTitle'
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select name="" id="postAuthor" value={userId} onChange={onAuhtorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor='postContent'>Content:</label>
                <textarea
                    id='postContent'
                    name='postContent'
                    value={content}
                    onChange={onContentChanged}
                />
                <button type='button' disabled={!canSave} onClick={onSavePostClicked}>Save Post</button>
            </form>
        </section>
    );
};
