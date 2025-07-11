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
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='text' {...register('username')} placeholder='Usuario' />
      <input type='password' {...register('password')} placeholder='Password' />
      <input type='password' {...register('confirmPassword')} placeholder='Confirm password' />
      <button type='submit'>Enviar</button>
    </form>
  )
}
