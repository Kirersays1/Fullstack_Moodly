import { safeParse } from 'valibot';
import axios from 'axios';
import { CourseSchema, CoursesSchema, Course } from '../types';

type CourseData = {
    [k: string]: FormDataEntryValue;
};

// Crear un nuevo curso
export async function addCourse(data: CourseData) {
    try {
        const result = safeParse(CourseSchema, {
            id_curso: data.id_curso,
            id_usuario: data.id_usuario,
            id_materia: data.id_materia,
            id_material_didactico: data.id_material_didactico,
        });

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/course/create`;
            await axios.post(url, result.output);
        } else {
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

        const result = safeParse(CoursesSchema, data);
        if (result.success) {
            return result.output;
        } else {
            throw new Error('Error al obtener los cursos');
        }
    } catch (error) {
        console.log(error);
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
