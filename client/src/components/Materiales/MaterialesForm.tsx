import { Material } from "../../types"

type UserFormProps = {
    user?: Material
}
const userOptions = [
    { name: 'Video', value: 'Video'},
    { name: 'PDF', value: 'PDF'},
    { name: 'Programa', value: 'Programa'},
    { name: 'Powerpoint', value: 'Powerpoint'},
    { name: 'Office', value: 'Office'},
    { name: 'Otro', value: 'Otro'},

]

export default function MaterialesForm({user} : UserFormProps) {
  return (
      <>
          <div className="mb-4">
              <label
                  className="text-gray-800"
                  htmlFor="tipo"
              >Tipo:</label>
              <select
                  id="tipo"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  name="tipo"
                  defaultValue={user?.tipo}
              >
                  {userOptions.map(option => (
                      <option key={option.name} value={option.value.toString()}>{option.name}</option>
                  ))}
              </select>
          </div>

          {/* Email */}
          <div className="mb-4">
              <label
                  className="text-gray-800"
                  htmlFor="email"
              >Url:</label>
              <input
                  id="url"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Url del material"
                  name="url"
                  defaultValue={user?.url}
              />
          </div>



      </>
  )
}
