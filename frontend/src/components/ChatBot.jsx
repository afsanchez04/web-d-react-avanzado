import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect } from 'react'
import { ChatContext } from '../context/ChatContext'
import { useOllama } from '../hooks/useOllama'
import axios from 'axios'
import '../ChatBot.css'

const schema = yup.object({
  userInput: yup
    .string()
    .min(3, 'El mensaje debe tener mínimo 3 caracteres.')
    .required('El mensaje es obligatorio')
})

export const ChatBot = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const { state, dispatch } = useContext(ChatContext)
  const { sendMessage } = useOllama()

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/messages')
        res.data.forEach(m => {
          dispatch({
            type: 'ADD_MESSAGE',
            payload: {
              from: m.sender === 'user' ? 'user' : 'bot',
              text: m.text
            }
          })
        })
      } catch (error) {
        console.error('Error al cargar mensaje', error)
      }
    }
    fetchMessages()
  }, [dispatch])

  const handlePregunta = async (data) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { from: 'user', text: data.userInput } })
    dispatch({ type: 'SET_LOADING', payload: true })

    try {
      // Guardar mensaje del usuario en la base de datos
      await axios.post('http://localhost:3001/api/messages', {
        sender: 'user',
        text: data.userInput
      })
      const res = await sendMessage(data.userInput)

      const botMessage = { from: 'bot', text: res.data.response }

      // Guardar mensaje del bot en la base de datos
      await axios.post('http://localhost:3001/api/messages', {
        sender: 'bot',
        text: res.data.response
      })

      dispatch({ type: 'ADD_MESSAGE', payload: botMessage })
    } catch (error) {
      console.log(error)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  return (
    <div className='chat-container'>

      <div className='chat-messages'>
        {state.messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.from === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
          </div>
        ))}
        {state.loading && <p className='loading'>Generando respuesta 🚀</p>}
      </div>
      <form onSubmit={handleSubmit(handlePregunta)}>
        <input
          type='text'
          {...register('userInput')}
          placeholder='Escribe tu mensaje...'
        />
        <button type='submit'>Preguntar</button>
      </form>
      {errors.userInput && <p>{errors.userInput.message}</p>}
    </div>
  )
}
