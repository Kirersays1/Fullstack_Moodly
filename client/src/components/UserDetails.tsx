import { useNavigate, Form, ActionFunctionArgs, redirect, useFetcher } from 'react-router-dom'
import { User } from "../types"
import {deleteUser} from "../services/UserService.ts";

type UserDetailsProps = {
    user: User
}

export async function action({params} : ActionFunctionArgs) {
    if(params.id !== undefined) {
        await deleteUser(+params.id)
        return redirect('/')
    }
}

export default function UserDetails({user} : UserDetailsProps) {

    const fetcher = useFetcher()
    const navigate = useNavigate()

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {user.nombre}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {user.email}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method='POST'>
                    <button
                        type='submit'
                        name='id'
                        value={user.id_usuario}
                        className={` 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                    >
                    </button>
                </fetcher.Form>
                
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/user/editar/${user.id_usuario}`)}
                        className='bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center'
                    >Editar</button>

                    <Form
                        className='w-full'
                        method='POST'
                        action={`user/eliminar/${user.id_usuario}`}
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
