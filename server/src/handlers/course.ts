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
                { model: User, attributes: ['nombre', 'email'] },
                { model: Materia, attributes: ['titulo'] },
                { model: Material, attributes: ['tipo', 'url'] }
            ],
            order: [['id_curso', 'DESC']],
        });

        res.json({ data: courses });
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
                { model: User, attributes: ['nombre', 'email'] },
                { model: Materia, attributes: ['titulo'] },
                { model: Material, attributes: ['tipo', 'url'] }
            ],
        });

        console.log(colors.green('Solicitaron al curso: ') + id);

        if (!course) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }

        res.json({ data: course });
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
