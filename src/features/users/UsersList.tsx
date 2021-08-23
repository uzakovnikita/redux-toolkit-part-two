import { Link } from "react-router-dom";

import { selectAllUsers } from "./userSlice";

import { useAppSelector } from "../../app/hooks"

export const UsersList = () => {
    const users = useAppSelector(selectAllUsers);

    const renderedUsers = users.map(user => (
        <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
        </li>
    ))

    return (
        <section>
            <h2>Users</h2>

            <ul>{renderedUsers}</ul>
        </section>
    )
}