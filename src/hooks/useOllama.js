import axios from 'axios'
import { useReducer } from 'react'

const initialState = {
  messages: []
}

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      console.log('agregando mensaje...')
      console.log(state)
      return { ...state, messages: [...state.messages, action.payload] }
    default:
      return state
  }
}

export const useOllama = () => {
  const [dispatch] = useReducer(chatReducer, initialState)

  const sendMessage = async (userPrompt) => {
    try {
      const res = await axios.post('http://localhost:11434/api/generate', {
        model: 'deepseek-r1:1.5b',
        prompt: userPrompt,
        stream: false
      })
      // Dispatch para guardar el mensaje del usuario
      dispatch({ type: 'ADD_MESSAGE', payload: { from: 'user', text: userPrompt } })
      dispatch({ type: 'ADD_MESSAGE', payload: { from: 'bot', text: res.data.response } })
    } catch (error) {
      console.error('error: ', error)
    }
  }

  return { sendMessage }
}
