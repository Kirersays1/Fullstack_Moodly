import { Link, useLoaderData} from 'react-router-dom'
import { User } from '../../types';
import {getUsers} from "../../services/UserService.ts";
import UserDetails from "../../components/User/UserDetails.tsx";

export async function loader() {
  const users = await getUsers()
  return users
}


export default function Users() {

  const data = useLoaderData() as User[]

  return (
    <>
        <div className='flex justify-between'>
            <h2 className='text-4xl font-black text-slate-500'>Usuarios</h2>
            <Link
                to="user/new"
                className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
            >
                Agregar Usuario
            </Link>
        </div>




        <div className="p-2">
            <table className="w-full mt-5 table-auto">
                <thead className="bg-slate-800 text-white">
                <tr>
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Rol</th>
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
