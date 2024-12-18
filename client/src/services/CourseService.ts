import { safeParse } from 'valibot';
import axios from 'axios';
import { CourseSchema, CoursesSchema, Course,DraftCourseSchema } from '../types';

type CourseData = {
    [k: string]: FormDataEntryValue;
};

// Crear un nuevo curso
export async function addCourse(data: CourseData) {
    try {
        const result = safeParse(DraftCourseSchema, {
            id_usuario: data.id_usuario,
            id_materia: data.id_materia,
            id_material_didactico: data.id_material_didactico,
        });

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/course/create`
            await axios.post(url, {
                id_usuario: result.output.id_usuario,
                id_materia: result.output.id_materia,
                id_material_didactico: result.output.id_material_didactico,
            })
        }else {
            throw new Error('Datos no válidos');
        }
    } catch (error) {
        console.log(error);
    }
}

// Obtener todos los cursos
export async function getCourses() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/course/getAll`;
        const { data } = await axios(url);

        const result = safeParse(CoursesSchema, data.data);

        if (result.success) {
            console.log("Cursos validados correctamente:", result.output);
            return result.output;
        } else {
            console.error("Errores de validación detallados:", JSON.stringify(result.issues, null, 2));
            throw new Error('Error al validar los cursos: Datos no válidos');
        }
    } catch (error) {
        console.error("Error en getCourses:", error);
        throw error;
    }
}



// Obtener un curso por ID
export async function getCourseById(id: Course['id_curso']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/course/${id}`;
        const { data } = await axios(url);

        const result = safeParse(CourseSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            throw new Error('Error al obtener el curso');
        }
    } catch (error) {
        console.log(error);
    }
}

// Eliminar un curso
export async function deleteCourse(id: Course['id_curso']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/course/${id}`;
        await axios.delete(url);
    } catch (error) {
        console.log(error);
    }
}

// Actualizar un curso
export async function updateCourse(data: CourseData, id: Course['id_curso']) {
    try {
        const result = safeParse(CourseSchema, {
            id_curso: id,
            id_usuario: data.id_usuario,
            id_materia: data.id_materia,
            id_material_didactico: data.id_material_didactico,
        });

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/course/${id}`;
            await axios.put(url, result.output);
        } else {
            throw new Error('Datos no válidos');
        }
    } catch (error) {
        console.log(error);
    }
}
