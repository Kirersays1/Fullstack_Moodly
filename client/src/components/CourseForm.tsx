import { Course } from "../types"

type CourseFormProps = {
    course?: Course
}
export default function UserForm({course} : CourseFormProps) {
  return (
      <>
          {/* Usuario */}
          <div className="mb-4">
              <label
                  className="text-gray-800"
                  htmlFor="nombre"
              >Usuario:</label>
              <input
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del Usuario"
                  name="nombre"
                  defaultValue={course?.usuario_nombre}
              />
          </div>

          {/* Materia */}
          <div className="mb-4">
              <label
                  className="text-gray-800"
                  htmlFor="password"
              >Materia:</label>
              <input
                  id="password"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Materia"
                  name="password"
                  defaultValue={course?.materia_titulo}
              />
          </div>

          {/* Material Didactico */}
          <div className="mb-4">
              <label
                  className="text-gray-800"
                  htmlFor="rol"
              >Material didactico:</label>
              <input
                  id="rol"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Rol del usuario"
                  name="rol"
                  defaultValue={course?.usuario_email}
              />
          </div>


      </>
  )
}
