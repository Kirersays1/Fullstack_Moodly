import { Outlet ,Link} from 'react-router-dom'

export default function Layout() {
  return (
    <>
        <header className='bg-slate-800'>
            <div className='mx-auto max-w-6xl py-10'>
                <h1 className='text-4xl font-extrabold text-white'>
                    Administrador de Moodly
                </h1>
            </div>

            <div className='mx-auto max-w-6xl py-10'>
                <Link
                    to="/"
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                >
                    Usuarios
                </Link>

                <Link
                    to="/course"
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                >
                    Cursos
                </Link>

                <Link
                    to="/materia"
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                >
                    Materias
                </Link>

                <Link
                    to="/materialD"
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                >
                    Materiales Didacticos
                </Link>

            </div>
        </header>

        <main className='mt-10 mx-auto max-w-6xl p-10 bg-white shadow'>
            <Outlet />
        </main>
    </>
  )
}
