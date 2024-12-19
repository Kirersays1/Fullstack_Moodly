import { useEffect, useState } from "react";
import { Course, User, Materia, Material } from "../../types";
import { getUsers } from "../../services/UserService.ts";
import { getMaterias } from "../../services/MateriaService.ts";
import { getMateriales } from "../../services/MaterialesDService.ts";

type CourseFormProps = {
    course?: Course;
};

export default function CourseForm({ course }: CourseFormProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [usersData, materiasData, materialsData] = await Promise.all([
                    getUsers(),
                    getMaterias(),
                    getMateriales(),
                ]);

                setUsers(usersData || []);
                setMaterias(materiasData || []);
                setMaterials(materialsData || []);
            } catch (err) {
                setError("Error al cargar los datos.");
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Cargando datos...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <>
            {/* Select de usuarios */}
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="id_usuario">
                    Usuario:
                </label>
                <select
                    id="id_usuario"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="id_usuario"
                    defaultValue={course?.id_usuario}
                >
                    <option value="">Seleccione un usuario</option>
                    {users.map((user) => (
                        <option key={user.id_usuario} value={user.id_usuario.toString()}>
                            {user.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {/* Select de materias */}
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="id_materia">
                    Materia:
                </label>
                <select
                    id="id_materia"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="id_materia"
                    defaultValue={course?.id_materia}
                >
                    <option value="">Seleccione una materia</option>
                    {materias.map((materia) => (
                        <option key={materia.id_materia} value={materia.id_materia.toString()}>
                            {materia.titulo}
                        </option>
                    ))}
                </select>
            </div>

            {/* Select de materiales didácticos */}
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="id_material_didactico">
                    Material Didáctico:
                </label>
                <select
                    id="id_material_didactico"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="id_material_didactico"
                    defaultValue={course?.id_material_didactico}
                >
                    <option value="">Seleccione un material</option>
                    {materials.map((material) => (
                        <option key={material.id_material_didactico} value={material.id_material_didactico.toString()}>
                            {material.tipo}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}
