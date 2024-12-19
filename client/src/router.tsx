import { createBrowserRouter } from 'react-router-dom'

import Layout from './layouts/Layout'

import Users, { loader as usersLoader} from './views/User/Users.tsx'
import EditUser, { loader as editUserLoader, action as editUserAction } from './views/User/EditUser.tsx'
import NewUser,{action as newUserAction} from "./views/User/NewUser.tsx";
import {action as deleteUser} from "./components/User/UserDetails.tsx";

import Courses, { loader as coursesLoader}from "./views/Course/Courses.tsx";
import NewCourse,{action as newCourseAction} from "./views/Course/NewCourse.tsx";
import {action as deleteCourse} from "./components/Course/CourseDetails.tsx";

import Materia,{loader as MateriaLoader} from "./views/Materia/Materia.tsx";
import NewMateria,{action as newMateriaAction}from "./views/Materia/NewMateria.tsx";
import EditMateria,{action as editMateriaAction,loader as editMateriaLoader} from "./views/Materia/EditMateria.tsx";
import {action as deleteMateria} from "./components/Materia/MateriaDetails.tsx";

import Material,{loader as MaterialesLoader} from "./views/Material_Didactico/Materiales.tsx";
import NewMaterial,{action as newMaterialDAction} from "./views/Material_Didactico/NewMaterial.tsx";
import EditMaterialD,{action as editMaterialDAction,loader as editMaterialDLoader} from "./views/Material_Didactico/EditMaterialD.tsx";
import {action as deleteMaterial} from "./components/Materiales/MaterialesDetails.tsx"

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

            //****************************CURSOS*******************************************
            {
                path:'course/',
                element: <Courses/>,
                loader: coursesLoader
            },
            {
                path:'newCourse',
                element: <NewCourse/>,
                action: newCourseAction
            },
            {
                path:'course/eliminar/:id',
                action: deleteCourse
            },

            //*************************************MATERIAS***************************************
            {
                path:'materia/',
                element: <Materia/>,
                loader: MateriaLoader
            },
            {
                path: 'materia/new',
                element: <NewMateria/>,
                action: newMateriaAction
            },
            {
                path: 'materia/editar/:id',
                element: <EditMateria/>,
                action: editMateriaAction,
                loader: editMateriaLoader
            },
            {
                path: 'materia/eliminar/:id',
                action: deleteMateria
            },
            //*************************************MATERIALES*************************************
            {
                path:'materialD/',
                element: <Material/>,
                loader: MaterialesLoader
            },
            {
                path:'materialD/new',
                element: <NewMaterial/>,
                action: newMaterialDAction
            },
            {
                path: 'materialD/editar/:id',
                element: <EditMaterialD/>,
                action: editMaterialDAction,
                loader: editMaterialDLoader
            },
            {
                path: 'materialD/eliminar/:id',
                action: deleteMaterial,
            },




        ],
    }
])