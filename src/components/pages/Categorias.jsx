import ModalAction from "../component/ModalActionCategoria";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil,faTrash,faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {ListarCategorias} from "../../services/CategoriasServices";
import Paginacao from "../component/Paginacao";

function Categorias() {

    
    const [ShowModal, setShowModal] = useState(false);
    const [action, setAction] = useState('cad');
  
    const [categoriasData,setCategorias] = useState([]);
    const [categoriaUpdate,setCategoriaUpdate] = useState([]);
    const [categoriaDelete,setCategoriaDelete] = useState([]);
    //PAGINACAO
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(10);
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();
   
    function nav(url) {
        navigate(url);
    }


    useEffect(() => {
        async function carregarCategorias(pagina) {
          const dados = await ListarCategorias(pagina);
          console.log("pagina Categorias por pagina");
          console.log(dados);
          const arrayCategorias = Object.values(dados.categorias);
          setCategorias(arrayCategorias);
          setPorPagina(dados.por_pagina);
          setTotal(dados.total);
        }
        carregarCategorias(pagina);
      }, [pagina]);
    
      const totalPaginas = Math.ceil(total / porPagina);

      const mudarPagina = (novaPagina) => {
        if (novaPagina >= 1 && novaPagina <= totalPaginas) {
       
          setPagina(novaPagina);
        }
      };

    async function CarregarCategorias() {
        const dados = await ListarCategorias(); // aqui você chama a função
        console.log("NORMAL categoria");
        console.log(dados);
        setCategorias(dados.categorias);
    } 
    
    useEffect(() => {
        CarregarCategorias();
    },[])

   
    function atualizar() {
        CarregarCategorias();
    }
    
    function cadastrar() {
        setAction('cad'); 
        setShowModal(true);
    }

    function update(categoriasUpdate) {
        setCategoriaUpdate(categoriasUpdate)
        setAction('edit'); 
        setShowModal(true);
        
       
    }
    function deletar(categoriaDelete){

      
        setAction('delete'); 
        setCategoriaDelete(categoriaDelete);
        setShowModal(true);
    }

    return (
        <>
       
        <ModalAction ShowModal={ShowModal} setShowModal={setShowModal} action={action} atualizar={atualizar} categoriaUpdate={categoriaUpdate} categoriaDelete={categoriaDelete}/>
        <div className="container">
                    <div className="row">
                        <div className="col-md-12 d-flex justify-content-start">
                            <button className="btn btn-secondary " onClick={() =>nav('/produtos') }> <FontAwesomeIcon icon={faArrowLeft}/>  Gerenciar Produtos</button>
                           
                        </div>
                    </div>
            </div>
            
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Categorias</h2>
                    <button className="btn btn-primary" data-bs-toggle="modal" onClick={() => cadastrar()} data-bs-target="#modalCateogria">Cadastrar Cateogria</button>
                </div>   


                {/* TABELA  */}
                <div className="table-responsive">
                    <table className="table table-bordered table-striped align-middle text-center">
                        <thead className="table-dark">
                            <tr>
                               
                                <th>Data</th>
                                <th>Nome</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody id="tabelaCategorias">
                       {console.log("DATA CARTIGORITA ")}
                       {console.log(categoriasData)}
                        {categoriasData.length > 0 && categoriasData.map((categoriasItem, index) => {
                           
                            return (
                                <tr key={index}>
                                   
                                    <td>{categoriasItem.created_at}</td>
                                    <td>{categoriasItem.nome}</td>

                                    <td>
                                        <button className="btn btn-warning me-4 text-white"  data-bs-toggle="modal" data-bs-target="#modalCategoria"  onClick={() => update(categoriasItem) } ><FontAwesomeIcon icon={faPencil}/> </button>
                                        <button data-bs-toggle="modal" className="btn btn-secondary me-4" data-bs-target="#modaCategoria"  onClick={() => deletar(categoriasItem) }><FontAwesomeIcon icon={faTrash}/> </button>
                                    </td>
                                </tr>
                            )
                        })}
                          {(categoriasData.length == 0) ? <tr ><td colSpan={6} style={{ textAlign: 'center' }}> Sem Registros </td> </tr> : ''}
                        </tbody>
                    </table>
                    
                </div>
                {/* FIM  TABELA  */}
                <Paginacao mudarPagina={mudarPagina} pagina={pagina} totalPaginas={totalPaginas} />
            </div>
            {/* <div className="modal-backdrop fade" style={{'z-index': '-999'}}></div> */}
        </>
    )
}

export default Categorias;