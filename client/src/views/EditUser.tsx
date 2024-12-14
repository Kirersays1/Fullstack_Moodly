import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { getUserById, updateUser } from '../services/UserService'
import {UserEdit} from '../types'
import {EditUserForm} from '../components/UserForm'

export async function loader({params} : LoaderFunctionArgs) {
    if(params.id !== undefined) {
        const user = await getUserById(+params.id)
        if(!user) {
            return redirect('/')
        }
        return user
    }
}

export async function action({request, params} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if(error.length) {
        return error
    }

    if(params.id !== undefined) {
        await updateUser(data, +params.id)
        console.log('Datos recibidos:', data);
        return redirect('/')
    }

}
const userOptions = [
    { name: 'I', value: 'I'},
    { name: 'A', value: 'A'}
]

export default function EditUser() {
    const user = useLoaderData() as UserEdit
    const error = useActionData() as string

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>Editar Usuario</h2>
                <Link
                    to="/"
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                >
                    Volver a Usuarios
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                className="mt-10"
                method='POST'
            >

                <EditUserForm
                    userEdit={user}
                />

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="rol"
                    >Rol:</label>
                    <select
                        id="rol"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="rol"
                        defaultValue={user?.rol.toString()}
                    >
                        {userOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Guardar Cambios"
                />
            </Form>

        </>
    )
}
