//import { useState } from 'react'

import './App.css'
import Vitrine from './components/pages/Vitrine'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {ListarCategorias} from "./services/CategoriasServices";
import {ListarProdutos} from "./services/ProdutosServices";
function App() {
  const navigate = useNavigate();
  const [carregado, setCarregado] = useState(false);
  const [produtos,setProdutos] = useState([]);
    function nav(url) {
        navigate(url);
    }
   const [categorias,setCategorias] = useState([]);
 

    useEffect(() => {
      async function carregarCategorias() {
        const dados = await ListarCategorias();
        setCategorias(dados.categorias);
      }
      carregarCategorias();
    }, []);


    useEffect(() => {
      if (!carregado) {
        async function carregarProdutos() {
          const dados = await ListarProdutos();
          setProdutos(dados.produtos);
          setCarregado(true);
        }
        carregarProdutos();
      }
    }, [carregado]);
  return (
    <>
    
      <div className="container">
          <div className="row">
            <div className="col-md-12 d-flex justify-content-end">
              <button className="btn btn-secondary " onClick={() =>nav('/produtos') }>Gerenciar Produtos <FontAwesomeIcon icon={faArrowRight}/></button>
            </div>
          </div>


        <div className="container text-center mt-5">
            <div className="custom-title">
              <h1>Seja bem-vindo à ShopStore</h1>
              <p>Os melhores produtos, com o melhor preço. Confira abaixo nossos produtos por categorias!</p>
            
            </div>
            
          </div>


        </div>

          
          {categorias.map((item) => {

            return (
            <>
              <div className='container'>
                <div className='row'>
            
              <Vitrine key={item.id} categoriaID={item.id} CategoriaName={item.nome} produtos={produtos}/>
                </div>
             </div>
            </>
            )
          })}
        
    </>
  )
}

export default App
