import { useForm } from 'react-hook-form'

export const BasicForm = () => {
  const { register, handleSubmit } = useForm()

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
