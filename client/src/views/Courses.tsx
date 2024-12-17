import { ActionFunctionArgs, Link, useLoaderData} from 'react-router-dom'
import { Course } from '../types';
import {getUserById, getUsers} from "../services/UserService.ts";
import UserDetails from "../components/UserDetails.tsx";

export async function loader() {
  const users = await getUsers()
  return users
}

export async function action({request} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    await getUserById(+data.id)
    return {}
}

export default function Users() {

  const data = useLoaderData() as Course[]

  return (
    <>
        <div className='flex justify-between'>
            <h2 className='text-4xl font-black text-slate-500'>Cursos</h2>
            <Link
                to="course/new"
                className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
            >
                Registrar a curso
            </Link>
        </div>
  

        <div className="p-2">
            <table className="w-full mt-5 table-auto">
                <thead className="bg-slate-800 text-white">
                <tr>
                    <th className="p-2">Nombre del usuario</th>
                    <th className="p-2">Materia</th>
                    <th className="p-2">Material didactico</th>
                    <th className="p-2">Acciones</th>

                </tr>
                </thead>
                <tbody>
                {data.map(user => (
                      <UserDetails
                          key={user.id_usuario}
                          user={user}
                      />
                  ))}
                </tbody>
            </table>
        </div>
    </>
  )
}
