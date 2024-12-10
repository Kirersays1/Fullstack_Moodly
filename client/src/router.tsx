import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Products, { loader as productsLoader, action as updateAvailabilityAction } from './views/Products'
import Users, { loader as usersLoader, action as actionUser} from './views/Users'
import NewProduct, { action as newProductAction } from './views/NewProduct'
import EditProduct, { loader as editProductLoader, action as editProductAction } from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetails'
import NewUser,{action as newUserAction} from "./views/NewUser.tsx";
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
                path:'productos/:id/editar', // ROA Pattern - Resource-oriented design
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },

            {
                path:'user/eliminar/:id',
                action: deleteUser
            }
        ],
    }
])