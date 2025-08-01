import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  username: yup
    .string()
    .required('El nombre es obligatorio'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener mínimo 6 caracteres.')
    .required('La contraseña es obligatoria'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña')
})

export const BasicForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type='text'
        {...register('username')}
        placeholder='Usuario'
        className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
      />
      {errors.username && <p>{errors.username.message}</p>}
      <br />
      <input
        type='password'
        {...register('password')}
        placeholder='Password'
        className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
      />
      {errors.password && <p>{errors.password.message}</p>}
      <br />
      <input
        type='password'
        {...register('confirmPassword')}
        placeholder='Confirm password'
        className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      <br />
      <button
        type='submit'
        disabled={!isValid}
        className={`w-full py-2 rounded transition cursor-pointer 
              ${isValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}

      >Enviar
      </button>
    </form>
  )
}
