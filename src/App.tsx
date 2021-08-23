import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import { Navbar } from './app/Navbar';

import { PostsList } from './features/posts/PostList';
import { AddPostForm } from './features/posts/AddPostForm';
import { SinglePostPage } from './features/posts/SinglePostPage';
import { EditPostForm } from './features/posts/EditPostForm';
import { UsersList } from './features/users/UsersList';
import { UserPage } from './features/users/UserPage';
import { NotificationsList } from './features/notifications/NotificationsList';

function App() {
    return (
        <Router>
            <Navbar />
            <div className='App'>
                <Switch>
                    <Route
                        exact
                        path='/'
                        render={() => (
                            <>
                                <AddPostForm />
                                <PostsList />
                            </>
                        )}
                    />
                    <Route
                        exact
                        path='/posts/:postId'
                        component={SinglePostPage}
                    />
                    <Route path="/editPost/:postId" component={EditPostForm}></Route>
                    <Route exact path="/users" component={UsersList} />
                    <Route exact path="/users/:user" component={UserPage} />
                    <Route exact path="/notifications" component={NotificationsList} />
                    <Redirect to='/' />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
