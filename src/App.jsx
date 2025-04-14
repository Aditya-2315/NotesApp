import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <div >
        <Navbar/>
        <main>
          <Outlet/>
        </main>
      </div>
    </>
  )
}

export default App
