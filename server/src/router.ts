import { Router } from 'express'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware'
import {createUser, deleteUser, getUserById, getUsers, updateUser} from "./handlers/user";
import {createMateria, deleteMateria, getMateriaById, getMaterias, updateMateria} from "./handlers/materia";
import {createMaterial, getMaterials, deleteMaterial, getMaterialById, updateMaterial} from "./handlers/materialDidactico";
import {createCourse, deleteCourse, getCourseById, getCourses, updateCourse} from "./handlers/course";

const router = Router()

router.get('/',(req,res) => {
    res.json('Desde GET')
})

//******************************************************* Router Usuario**********************************************//
//GET

//Obten a todos los usuarios
router.get('/user/getAll', getUsers)

//obten usuario especifico
router.get('/user/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getUserById
)

// POST

//Crear usuario
router.post('/user/create', createUser)

// PUT
// Actualizar Usuario
router.put('/user/:id',
    param('id').isInt().withMessage('ID no válido'),
    body('nombre')
        .notEmpty().withMessage('El nombre de Usuario no puede ir vacio'),
    body('password')
        .notEmpty().withMessage('La contraseña no puede ir vacia'),
    body('rol')
        .notEmpty().withMessage('El rol no puede ir vacio'),
    handleInputErrors,
    updateUser
)

// DELETE
// Borrar Usuario
router.delete('/user/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteUser
)


//******************************************************* Router Materia************************************************
// GET

// Obtener todas las materias
router.get('/materia/getAll', getMaterias)

// Obten materia especifico
router.get('/materia/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getMateriaById
)

// POST
router.post('/materia/create', createMateria) //Insertar materia

// PUT
router.put('/materia/:id',
    param('id').isInt().withMessage('ID no válido'),
    body('titulo')
        .notEmpty().withMessage('El nombre de Usuario no puede ir vacio'),
    body('descripcion')
        .notEmpty().withMessage('La contraseña no puede ir vacia'),
    handleInputErrors,
    updateMateria
)

// DELETE

// Borrar Materia
router.delete('/materia/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteMateria
)

//******************************************** Router Material Didactico************************************************
// GET

// Obtener todas las materias
router.get('/materialD/getAll', getMaterials)

// Obten materia especifico
router.get('/materialD/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getMaterialById
)

// POST
router.post('/materialD/create', createMaterial) //Insertar materia

// PUT
router.put('/materialD/:id',
    param('id').isInt().withMessage('ID no válido'),
    body('tipo')
        .notEmpty().withMessage('El nombre de tipo no puede ir vacio'),
    body('url')
        .notEmpty().withMessage('La url no puede ir vacia'),
    handleInputErrors,
    updateMaterial
)

// DELETE

// Borrar Materia
router.delete('/materialD/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteMaterial
)

//******************************************** Router Curso*************************************************************
// GET

// Obtener todos los cursos
router.get('/course/getAll', getCourses)

// Obten materia especifico
router.get('/course/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getCourseById
)

// POST
router.post('/course/create', createCourse) //Insertar materia

// PUT
router.put('/course/:id',
    param('id').isInt().withMessage('ID no válido'),
    body('id_usuario')
        .notEmpty().withMessage('ERROR ID_USUARIO VACIO'),
    body('id_materia')
        .notEmpty().withMessage('ERROR ID_MATERIA VACIO'),
    body('id_material_didactico')
        .notEmpty().withMessage('ERROR ID_MATERIAL DIDACTICO VACIO'),

    handleInputErrors,
    updateCourse
)

// DELETE

// Borrar Materia
router.delete('/course/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteCourse
)


export default router