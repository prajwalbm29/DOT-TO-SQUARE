import React from 'react'
import DrawingArea from './components/DrawingArea'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 p-4'>
      <h1 className='text-2xl font-bold mb-4'>Click to Draw a Square</h1>
      <Toaster position='top-center' />
      <DrawingArea />
    </div>
  )
}

export default App