import { Link, Form, useActionData, ActionFunctionArgs, redirect} from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage.tsx'

import {addMateria} from "../../services/MateriaService.ts";
import MateriaForm from "../../components/Materia/MateriaForm.tsx";

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
    await addMateria(data)
    
    return redirect('/')
}

export default function NewMateria() {
    const error = useActionData() as string

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>Registrar Materia</h2>
                <Link
                    to="/materia"
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                >
                    Volver a materias
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                className="mt-10"  
                method='POST'
            >
            
                <MateriaForm />

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Materia"
                />
            </Form>
        
        </>
    )
}
