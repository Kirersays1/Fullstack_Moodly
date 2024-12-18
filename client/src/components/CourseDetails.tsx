import { useNavigate, Form, ActionFunctionArgs, redirect } from 'react-router-dom';
import { Course } from "../types";
import { deleteCourse } from "../services/CourseService.ts";

type CourseDetailsProps = {
    course: Course;
};

export async function action({ params }: ActionFunctionArgs) {
    if (params.id !== undefined) {
        await deleteCourse(+params.id); // Llama al servicio para eliminar el curso
        return redirect('/course'); // Redirige después de eliminar
    }
}

export default function CourseDetails({ course }: CourseDetailsProps) {
    const navigate = useNavigate();

    return (
        <tr className="border-b">
            <td className="p-3 text-lg text-gray-800">
                {course.usuario_nombre|| 'Usuario no asignado'}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {course.materia_titulo || 'Materia no asignada'}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {course.material_tipo|| 'Material no asignado'}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/course/edit/${course.id_curso}`)}
                        className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                    >
                        Editar
                    </button>

                    <Form
                        className="w-full"
                        method="POST"
                        action={`/course/delete/${course.id_curso}`}
                        onSubmit={(e) => {
                            if (!confirm('¿Eliminar este curso?')) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <input
                            type="submit"
                            value="Eliminar"
                            className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    );
}
