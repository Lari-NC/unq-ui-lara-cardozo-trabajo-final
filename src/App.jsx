import { useState } from 'react'
import './App.css'
import MainMenu from "./pages/MainMenu/MainMenu"
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainMenu />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
