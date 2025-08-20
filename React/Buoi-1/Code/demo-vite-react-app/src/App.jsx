import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Welcome(props) {   
    // setProps({name : "Long"})
  return <h1>Xin chao, {props.name}!</h1>;
}

function App() {
  
    return <Welcome name="Khanh" />;
}
export default App
