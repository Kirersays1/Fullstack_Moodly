import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage.tsx'
import { getMaterialById, updateMaterial } from '../../services/MaterialesDService.ts'
import {Material} from '../../types'
import MaterialForm from '../../components/Materiales/MaterialesForm.tsx'

export async function loader({params} : LoaderFunctionArgs) {
    if(params.id !== undefined) {
        const user = await getMaterialById(+params.id)
        if(!user) {
            return redirect('/materialD')
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
        await updateMaterial(data, +params.id)
        console.log('Datos recibidos:', data);
        return redirect('/materialD')
    }

}


export default function EditMaterialD() {
    const user = useLoaderData() as Material
    const error = useActionData() as string

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>Editar Material Didactico</h2>
                <Link
                    to="/materialD"
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                >
                    Volver a Materiales Didacticos
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                className="mt-10"
                method='POST'
            >

                <MaterialForm
                    user={user}
                />


                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Guardar Cambios"
                />
            </Form>

        </>
    )
}
