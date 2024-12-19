import { Course } from "../../types"

type CourseFormProps = {
    course?: Course
}
export default function CourseForm({course} : CourseFormProps) {
  return (
      <>
          {/* Usuario */}
          <div className="mb-4">
              <label
                  className="text-gray-800"
                  htmlFor="id_usuario"
              >Usuario:</label>
              <input
                  id="id_usuario"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del Usuario"
                  name="id_usuario"
                  defaultValue={course?.id_usuario}
              />
          </div>

          {/* Materia */}
          <div className="mb-4">
              <label
                  className="text-gray-800"
                  htmlFor="id_materia"
              >Materia:</label>
              <input
                  id="id_materia"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Materia"
                  name="id_materia"
                  defaultValue={course?.id_materia}
              />
          </div>

          {/* Material Didactico */}
          <div className="mb-4">
              <label
                  className="text-gray-800"
                  htmlFor="id_material_didactico"
              >Material didactico:</label>
              <input
                  id="id_material_didactico"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Material didactico"
                  name="id_material_didactico"
                  defaultValue={course?.id_material_didactico}
              />
          </div>


      </>
  )
}
