import { Link, useLoaderData} from 'react-router-dom'
import { Materia } from '../../types';
import {getMaterias} from "../../services/MateriaService.ts";
import MateriaDetails from "../../components/Materia/MateriaDetails.tsx";

export async function loader() {
  const materias = await getMaterias()
  return materias
}


export default function Materia() {

  const data = useLoaderData() as Materia[]

  return (
    <>
        <div className='flex justify-between'>
            <h2 className='text-4xl font-black text-slate-500'>Materias</h2>
            <Link
                to="new"
                className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
            >
                Agregar Materia
            </Link>
        </div>




        <div className="p-2">
            <table className="w-full mt-5 table-auto">
                <thead className="bg-slate-800 text-white">
                <tr>
                    <th className="p-2">Titulo</th>
                    <th className="p-2">Descripción</th>
                    <th className="p-2">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {data.map(user => (
                      <MateriaDetails
                          key={user.id_materia}
                          user={user}
                      />
                  ))}
                </tbody>
            </table>
        </div>
    </>
  )
}
