
import {CadastrarCategoria,AtualizarCategoria,DeletarCategoria} from "../../services/CategoriasServices";
import { useEffect, useState } from "react";
import Notificacao from "./Notificacao";




function ModalAction({ShowModal,setShowModal,action,atualizar,categoriaUpdate,categoriaDelete}) {
    const [erros, setErros] = useState({});
   
    const [notificacao,setNotificacao] =  useState(false);
    const [TituloAcao,setTituloAcao] = useState('Cadastrar');
    const [MensagemNotficao, setMensagemNotificao] = useState('');


    let categoriasData = {nome: ''}
    const [dadosForm, setDadosForm] = useState(categoriasData);
    
    

    useEffect(() => {
        if (action === 'edit' && categoriaUpdate) {
            setTituloAcao('Editar');
            setDadosForm(categoriaUpdate);
        }else if(action === 'cad'){
            setTituloAcao('Cadastrar');
            setDadosForm(categoriasData);
        }else{
            setTituloAcao('Deletar');
            setDadosForm(categoriaDelete);
        }
    }, [action, categoriaUpdate]);


    const handleChange = (e) => {
        
        const { name, value } = e.target;
     
        if (name === 'preco') {
            // Remove tudo que não for número ou ponto
            let valor = value.replace(/[^0-9.]/g, '');
        
            // Impede mais de um ponto decimal
            const partes = valor.split('.');
            if (partes.length > 2) {
                return; // mais de um ponto, ignora
            }
        
            // Limita casas decimais a 2
            if (partes.length === 2) {
                const [inteira, decimal] = partes;
                valor = inteira + '.' + decimal.slice(0, 2);
            }
        
            // Limita o valor total a 10 caracteres
            if (valor.length > 10) {
                valor = valor.slice(0, 10);
            }
        
            setDadosForm((prev) => ({ ...prev, preco: valor }));
        } else {
            setDadosForm((prev) => ({ ...prev, [name]: value }));
        }


          setErros((prev) => ({ ...prev, [name]: '' }));
      };
    
    const validarFormulario = () => {
        const novosErros = {};
    
        if (!dadosForm.nome.trim()) novosErros.nome = 'Nome é obrigatório';
     
    
        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const EnviarDadosApi = async (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            if(action == 'cad'){
                CadastrarCategoria(dadosForm).then((resultado) =>{
                    if (resultado.sucesso) {
                        setMensagemNotificao('Categoria cadastrada com Sucesso!')
                        setNotificacao(true);
                        setShowModal(false);
                        setDadosForm(categoriasData);
                        atualizar();
                    } 
               });
            }else if(action == 'edit'){
                AtualizarCategoria(dadosForm).then((resultado) =>{
                    if (resultado.sucesso) {
                        setMensagemNotificao('Categoria atualizada com sucesso!')
                        setNotificacao(true);
                        setShowModal(false);
                        atualizar();
                    } 
               });
            }
           
            
          } 
    };

    const RemoverCategoria = async () => {
        
        DeletarCategoria(categoriaDelete).then((resultado) =>{
            if (resultado.sucesso) {
                setMensagemNotificao('Categoria deletada  com Sucesso!')
                setNotificacao(true);
                setShowModal(false);
                atualizar();
            } 
       });
    }

    function cancelar(params) {
        setShowModal(false);
    }

    return (
        <>
        <Notificacao mensagem={MensagemNotficao} notificacao={notificacao}   onClose={() => setNotificacao(false)}/>
         {ShowModal &&(
            <>
                <div className="modal-backdrop" ></div>
           
                <div className="modalCustomCategoria">
                    <div className="modal-content">


                        <form  id="modalCategoria" onSubmit={EnviarDadosApi}>
                            <div className="modal-header">
                            <h5 className="modal-title">{TituloAcao} Cateogria</h5>
                                <button type="button" onClick={() => cancelar()} className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            
                            {action != 'delete' && (

                                <>
                                    <div className="modal-body">
                                        <input type="hidden" id="produtoId" name="id" value={dadosForm.id}/>
                                        <div className="mb-3">
                                            <label className="form-label">Nome da Categoria</label>
                                            <input type="text" id="nome"  name="nome"  value={dadosForm.nome} onChange={handleChange} className={`form-control ${erros.nome ? 'is-invalid' : ''}`}/>
                                            {erros.nome && (<div className="invalid-feedback"> {erros.nome} </div> )}
                                        </div>
                                    </div>
                                </>
                            )}
                            {action == 'delete' && (
                                <>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                        <p> Deseja realmente excluir esta categoria ? :  <span className="fw-bold"> {categoriaDelete.nome} </span> </p> 
                                        <p className="text-bg-danger p-3"> 
                                            <span className="fw-bold"> Aviso : </span> Ao excluir essa categoria também excluirá todos os produtos vinculados a esta categoria</p> 
                                        </div>
                                        
                                    </div>
                                
                                </>
                            
                            )}
                            <div className="modal-footer">
                            <button type="button" onClick={() => cancelar()} className="btn btn-secondary me-4" data-bs-dismiss="modal">Cancelar</button>
                            {action != 'delete' && (
                                    <button type="submit" className="btn btn-success">{TituloAcao}</button>
                            )}
                            {action == 'delete' && (
                                <button onClick={() => RemoverCategoria()} className="btn btn-danger">{TituloAcao}</button>
                            )}
                            </div>
                        </form>

                    </div>
                </div>
            </>
        )}

       
        </>
    )
}

export default ModalAction;