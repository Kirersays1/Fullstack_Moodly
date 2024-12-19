import { Link, useLoaderData} from 'react-router-dom'
import { Material } from '../../types';
import {getMateriales} from "../../services/MaterialesDService.ts";
import MaterialesDetails from "../../components/Materiales/MaterialesDetails.tsx";

export async function loader() {
  const users = await getMateriales()
  return users
}


export default function Materiales() {

  const data = useLoaderData() as Material[]

  return (
    <>
        <div className='flex justify-between'>
            <h2 className='text-4xl font-black text-slate-500'>Materiales Didacticos</h2>
            <Link
                to="new"
                className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
            >
                Agregar Material Didactico
            </Link>
        </div>




        <div className="p-2">
            <table className="w-full mt-5 table-auto">
                <thead className="bg-slate-800 text-white">
                <tr>
                    <th className="p-2">Tipo</th>
                    <th className="p-2">Url</th>
                    <th className="p-2">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {data.map(user => (
                      <MaterialesDetails
                          key={user.id_material_didactico}
                          user={user}
                      />
                  ))}
                </tbody>
            </table>
        </div>
    </>
  )
}
