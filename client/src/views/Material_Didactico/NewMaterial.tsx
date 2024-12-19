import { Link, Form, useActionData, ActionFunctionArgs, redirect} from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage.tsx'
import {addMaterial} from '../../services/MaterialesDService.ts'
import MaterialForm from '../../components/Materiales/MaterialesForm.tsx'

export async function action({request} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    console.log(data)
    let error = ''
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if(error.length) {
        return error
    }
    await addMaterial(data)
    
    return redirect('/materialD')
}

export default function NewMaterial() {
    const error = useActionData() as string

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>Registrar Material Didactico</h2>
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
            
                <MaterialForm />

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Material Didactico"
                />
            </Form>
        
        </>
    )
}
