import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Users, { loader as usersLoader} from './views/Users'
import EditUser, { loader as editUserLoader, action as editUserAction } from './views/EditUser'
import NewUser,{action as newUserAction} from "./views/NewUser.tsx";
import Courses, { loader as coursesLoader}from "./views/Courses.tsx";
import {action as deleteUser} from "./components/UserDetails.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Users/>,
                loader: usersLoader,
            },
            {
                path: 'user/new',
                element: <NewUser/>,
                action: newUserAction
            },
            {
                path:'user/editar/:id',
                element: <EditUser />,
                loader: editUserLoader,
                action: editUserAction
            },

            {
                path:'user/eliminar/:id',
                action: deleteUser
            },

            {
                path:'course/',
                element: <Courses/>,
                loader: coursesLoader
            }
        ],
    }
])