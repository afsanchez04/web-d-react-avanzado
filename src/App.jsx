import { ChatBot } from './components/ChatBot'
import { ChatProvider } from './context/ChatContext'
import './index.css'

export const App = () => {
  return (
    <ChatProvider>
      <ChatBot />
    </ChatProvider>
  )
}
