
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from './components/theme-provider'
import Home from './pages/Home'
import Footer from './pages/sub-components/Footer'
import { ToastContainer } from 'react-toastify';
import ProjectView from './pages/ProjectView'

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/project/:id' element={<ProjectView />}/>
          </Routes>
          <Footer />
          <ToastContainer position='bottom-right' theme='dark'/>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
