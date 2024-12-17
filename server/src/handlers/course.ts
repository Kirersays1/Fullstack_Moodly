import { Request, Response } from 'express';
import Course from '../models/Course.model';
import User from '../models/User.model';
import Materia from '../models/Materia.model';
import Material from '../models/Material.model';
import { check, validationResult } from 'express-validator';
import colors from 'colors';

// Crear curso
export const createCourse = async (req: Request, res: Response) => {
    try {
        // Validaciones
        await check('id_usuario').notEmpty().withMessage('El id_usuario no puede ir vacío').run(req);
        await check('id_materia').notEmpty().withMessage('El id_materia no puede ir vacío').run(req);
        await check('id_material_didactico').notEmpty().withMessage('El id_material_didactico no puede ir vacío').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(colors.red('ERROR AL REGISTRAR A CURSO'));
            return res.status(400).json({ errors: errors.array() });
        }

        // Crear curso en la base de datos
        const course = await Course.create(req.body);
        res.json({ data: course });
    } catch (error) {
        console.log(colors.red(error));
        res.status(500).json({ error: 'Error al crear el curso' });
    }
};

// Obtener todos los cursos con datos relacionados
export const getCourses = async (req: Request, res: Response) => {
    try {
        console.log(colors.green('Solicitaron todos los cursos'));

        const courses = await Course.findAll({
            include: [
                { model: User, attributes: ['id_usuario', 'nombre', 'email'] },
                { model: Materia, attributes: ['id_materia', 'titulo'] },
                { model: Material, attributes: ['id_material_didactico', 'tipo', 'url'] }
            ],
            order: [['id_curso', 'DESC']],
        });

        const flatCourses = courses.map(course => ({
            id_curso: course.id_curso,
            id_usuario: course.usuario?.id_usuario,
            id_materia: course.materia?.id_materia,
            id_material_didactico: course.materialDidactico?.id_material_didactico,
            fecha_creacion: course.fecha_creacion,
            usuario_nombre: course.usuario?.nombre,
            usuario_email: course.usuario?.email,
            materia_titulo: course.materia?.titulo,
            material_tipo: course.materialDidactico?.tipo,
            material_url: course.materialDidactico?.url
        }));

        res.json({ data: flatCourses });
    } catch (error) {
        console.log(colors.red(error));
        res.status(500).json({ error: 'Error al obtener los cursos' });
    }
};

// Obtener curso por ID con datos relacionados
export const getCourseById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const course = await Course.findByPk(id, {
            include: [
                { model: User, attributes: ['id_usuario', 'nombre', 'email'] },
                { model: Materia, attributes: ['id_materia', 'titulo'] },
                { model: Material, attributes: ['id_material_didactico', 'tipo', 'url'] }
            ],
        });

        console.log(colors.green('Solicitaron al curso: ') + id);

        if (!course) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }

        const flatCourse = {
            id_curso: course.id_curso,
            id_usuario: course.usuario?.id_usuario,
            id_materia: course.materia?.id_materia,
            id_material_didactico: course.materialDidactico?.id_material_didactico,
            fecha_creacion: course.fecha_creacion,
            usuario_nombre: course.usuario?.nombre,
            usuario_email: course.usuario?.email,
            materia_titulo: course.materia?.titulo,
            material_tipo: course.materialDidactico?.tipo,
            material_url: course.materialDidactico?.url
        };

        res.json({ data: flatCourse });
    } catch (error) {
        console.log(colors.red(error));
        res.status(500).json({ error: 'Error al obtener el curso' });
    }
};

// Actualizar curso
export const updateCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const course = await Course.findByPk(id);
        console.log(colors.blue('Actualicé CURSO con el id: ' + id));

        if (!course) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }

        await course.update(req.body);
        res.json({ data: course });
    } catch (error) {
        console.log(colors.red(error));
        res.status(500).json({ error: 'Error al actualizar el curso' });
    }
};

// Eliminar curso
export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }

        await course.destroy();
        res.json({ data: 'Curso eliminado' });
    } catch (error) {
        console.log(colors.red(error));
        res.status(500).json({ error: 'Error al eliminar el curso' });
    }
};
