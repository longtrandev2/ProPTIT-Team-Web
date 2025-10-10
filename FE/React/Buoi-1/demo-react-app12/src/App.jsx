import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Child from './Header'
import { useCallback } from 'react'
function App() {
  const [count, setCount] = useState(0)
  const calc = useCallback(() => {
    console.log(1+1)
  },[])
const [cnt, setCnt] = useState(0)
  return (
    <>
    <button onClick = {() => {
      setCnt(cnt +1)
    }}>click</button>
    <Child calc = {calc}/>
    </>
  )
}

export default App
