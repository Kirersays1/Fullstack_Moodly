import { useNavigate, Form, ActionFunctionArgs, redirect } from 'react-router-dom'
import { Material } from "../../types"
import {deleteMaterial} from "../../services/MaterialesDService.ts";

type UserDetailsProps = {
    user: Material
}

export async function action({params} : ActionFunctionArgs) {
    if(params.id !== undefined) {
        await deleteMaterial(+params.id)
        return redirect('/materialD')
    }
}

export default function MaterialesDetails({user} : UserDetailsProps) {

    const navigate = useNavigate()

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {user.tipo}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {user.url}
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/materialD/editar/${user.id_material_didactico}`)}
                        className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                    >Editar</button>

                    <Form
                        className='w-full'
                        method='POST'
                        action={`eliminar/${user.id_material_didactico}`}
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
