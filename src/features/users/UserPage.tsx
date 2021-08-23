import { Link } from "react-router-dom";
import { selectUserById } from "./userSlice";
import {  selectPostsByUser } from "../posts/postsSlice";
import { RouterUserParamsType } from "../posts/types";
import { useAppSelector } from "../../app/hooks";

export const UserPage = ({ match }: RouterUserParamsType) => {
    const userId = match.params.user;
    const user = useAppSelector(state => selectUserById(state, userId));

    const postsForUser = useAppSelector(state => selectPostsByUser(state, userId));

    const postTitles = postsForUser.map(post => (
        <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
    ));

    return (
        <section>
            <h2>{user?.name}</h2>

            <ul>{postTitles}</ul>
        </section>
    )
};