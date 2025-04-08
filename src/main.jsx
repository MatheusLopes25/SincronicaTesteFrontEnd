
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Header from './components/header/header.jsx'
import Produtos from './components/pages/Produtos.jsx'
import Categorias from './components/pages/Categorias.jsx'
import './index.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createBrowserRouter,RouterProvider } from "react-router-dom";



const router = createBrowserRouter([
  { path: "/", element: <> <Header />    <App /></> },
  { path: "/produtos", element: <><Header />    <Produtos /> </> },
  { path: "/categorias", element: <><Header />    <Categorias /> </> },
]);


createRoot(document.getElementById('root')).render(
 
    <RouterProvider router={router} />

)