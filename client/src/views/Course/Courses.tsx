import { Link, useLoaderData } from 'react-router-dom';
import { Course } from '../../types';
import { getCourses } from "../../services/CourseService.ts";
import CourseDetails from "../../components/Course/CourseDetails.tsx";


export async function loader() {
    try {
        const courses = await getCourses();


        console.log(courses);
        return courses || []; // Devuelve un arreglo vacío si no hay datos
    } catch (error) {
        console.error("Error cargando cursos:", error);
    }
}

export default function Courses() {
    const data = useLoaderData() as Course[]; // Los datos son un arreglo de cursos

    if (!data || data.length === 0) {
        return (
            <p className="text-center text-gray-500">
                No hay cursos registrados.
            </p>
        );
    }

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Cursos</h2>
                <Link
                    to="/newCourse"
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                >
                    Registrar a curso
                </Link>
            </div>

            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                    <tr>
                        <th className="p-2">Nombre del usuario</th>
                        <th className="p-2">Materia</th>
                        <th className="p-2">Material didáctico</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(course => (
                        <CourseDetails
                            key={course.id_curso}
                            course={course} // Pasar datos completos del curso
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
