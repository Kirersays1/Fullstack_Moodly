import { Materia } from "../../types"

type UserFormProps = {
    user?: Materia
}


export default function MateriaForm({user} : UserFormProps) {
  return (
      <>
          {/* Nombre */}
          <div className="mb-4">
              <label
                  className="text-gray-800"
                  htmlFor="titulo"
              >Titulo:</label>
              <input
                  id="titulo"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Titulo de la materia"
                  name="titulo"
                  defaultValue={user?.titulo}
              />
          </div>

          {/* Email */}
          <div className="mb-4">
              <label
                  className="text-gray-800"
                  htmlFor="descripcion"
              >Descripción:</label>
              <input
                  id="descripcion"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Descripcion de la materia"
                  name="descripcion"
                  defaultValue={user?.descripcion}
              />
          </div>


      </>
  )
}

