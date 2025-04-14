import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store.js'
import { Provider } from 'react-redux'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider }from 'react-router-dom'
import Home from './components/Home.jsx'
import Notes from './components/Notes.jsx'
import ViewNote from './components/ViewNote.jsx'
import { ToastContainer,toast } from "react-toastify";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='notes' element={<Notes/>}/>
      <Route path='notes/:id' element={<ViewNote/>}/>
    </Route>
  )
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    <ToastContainer />
    </Provider>
  </StrictMode>,
)
