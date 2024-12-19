import { useNavigate, Form, ActionFunctionArgs, redirect } from 'react-router-dom'
import { Materia } from "../../types"
import {deleteMateria} from "../../services/MateriaService.ts";

type UserDetailsProps = {
    user: Materia
}

export async function action({params} : ActionFunctionArgs) {
    if(params.id !== undefined) {
        await deleteMateria(+params.id)
        return redirect('/materia')
    }
}

export default function MateriaDetails({user} : UserDetailsProps) {

    const navigate = useNavigate()

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {user.titulo}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {user.descripcion}
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/materia/editar/${user.id_materia}`)}
                        className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                    >Editar</button>

                    <Form
                        className='w-full'
                        method='POST'
                        action={`eliminar/${user.id_materia}`}
                        onSubmit={ (e) => {
                            if( !confirm('¿Eliminar?') ) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <input
                            type='submit'
                            value='Eliminar'
                            className='bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                        />
                    </Form>
                </div>
            </td>
        </tr> 
    )
}
