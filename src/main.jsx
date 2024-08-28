import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import App from './App.jsx'
import './assets/main.css'
import Home from './views/Home.jsx'
import Register from './views/auth/Register.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <App /> }>
          <Route index element={ <Home /> } />
          <Route path='register' element={ <Register /> } />
        </Route>  
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
