import ModalAction from "../component/ModalActionProduto";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil,faTrash,faArrowRight,faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {ListarProdutos} from "../../services/ProdutosServices";
import Paginacao from "../component/Paginacao";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function Produtos() {

    
    const [ShowModal, setShowModal] = useState(false);
    const [action, setAction] = useState('cad');
    const [produtos,setProdutos] = useState([]);
    const [produtoUpdate,setProdutoUpdate] = useState([]);
    const [produtoDelete,setProdutoDelete] = useState([]);
    //PAGINACAO
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(10);
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();
   
    function nav(url) {
        navigate(url);
    }

    useEffect(() => {
        async function carregarProdutos() {
          const dados = await ListarProdutos(pagina);
          const arrayProdutos = Object.values(dados.produtos);
          setProdutos(arrayProdutos);
          setPorPagina(dados.por_pagina);
          setTotal(dados.total);
        }
        carregarProdutos();
      }, [pagina]);
    
      const totalPaginas = Math.ceil(total / porPagina);

      const mudarPagina = (novaPagina) => {
        if (novaPagina >= 1 && novaPagina <= totalPaginas) {
          setPagina(novaPagina);
        }
      };

    async function CarregarProdutos() {
        const dados = await ListarProdutos(); // aqui você chama a função

        setProdutos(dados.produtos);
    } 
    
    useEffect(() => {
        CarregarProdutos();
    },[])

   
    function atualizar() {
        CarregarProdutos();
    }
    
    function cadastrar() {
        setAction('cad'); 
        setShowModal(true);
    }

    function update(produtosUpdate) {
        setProdutoUpdate(produtosUpdate)
        setAction('edit'); 
        setShowModal(true);
       
    }
    function deletar(produtoDelete){
        setShowModal(true);
        setAction('delete'); 
        setProdutoDelete(produtoDelete);
    }

    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                    <button className="btn btn-secondary " onClick={() =>nav('/') }> <FontAwesomeIcon icon={faArrowLeft}/> Vitrine</button>
                    <button className="btn btn-secondary " onClick={() =>nav('/categorias') }>Gerenciar categorias <FontAwesomeIcon icon={faArrowRight}/></button>
                </div>
            </div>
        </div>
        <ModalAction ShowModal={ShowModal} setShowModal={setShowModal} action={action} atualizar={atualizar} produtoUpdate={produtoUpdate} produtoDelete={produtoDelete}/>
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Produtos</h2>
                    <button className="btn btn-primary" data-bs-toggle="modal" onClick={() => cadastrar()} data-bs-target="#modalProduto">Cadastrar Produto</button>
                </div>   


                {/* TABELA  */}
                <div className="table-responsive">
                    <table className="table table-bordered table-striped align-middle text-center">
                        <thead className="table-dark">
                            <tr>
                                
                                <th>Data</th>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Categoria</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody id="tabelaProdutos">
                       
                        {produtos.length > 0 && produtos.map((produtosItem, index) => {
                            //console.log(produtosItem)
                            return (
                                <tr key={index}>
                                  
                                    <td>{produtosItem.created_at}</td>
                                    <td>{produtosItem.nome}</td>
                                    <td>{produtosItem.preco}</td>
                                    <td>{produtosItem.categoria.nome}</td>

                                    <td>
                                        <button className="btn btn-warning me-4 text-white"  data-bs-toggle="modal" data-bs-target="#modalProduto"  onClick={() => update(produtosItem) } ><FontAwesomeIcon icon={faPencil}/> </button>
                                        <button data-bs-toggle="modal" className="btn btn-secondary me-4" data-bs-target="#modalProduto"  onClick={() => deletar(produtosItem) }><FontAwesomeIcon icon={faTrash}/> </button>
                                    </td>
                                </tr>
                            )
                        })}
                          {(produtos.length == 0) ? <tr ><td colSpan={6} style={{ textAlign: 'center' }}> Sem Registros </td> </tr> : ''}
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

export default Produtos;