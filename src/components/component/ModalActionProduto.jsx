
import {ListarCategorias} from "../../services/CategoriasServices";
import {CadastrarProduto,AtualizarProduto,DeletarProduto} from "../../services/ProdutosServices";
import { useEffect, useState } from "react";
import Notificacao from "./Notificacao";




function ModalAction({ShowModal,setShowModal,action,atualizar,produtoUpdate,produtoDelete}) {
    const [categorias,setCategorias] = useState([]);
    const [erros, setErros] = useState({});
   
    const [notificacao,setNotificacao] =  useState(false);
    const [TituloAcao,setTituloAcao] = useState('Cadastrar');
    const [MensagemNotficao, setMensagemNotificao] = useState('');
    

    let Produtos = {nome: '', descricao: '',preco: '', categoria_id :''}
    const [dadosForm, setDadosForm] = useState(Produtos);
    
    useEffect(() => {
        async function CarregarCategorias() {
            const dados = await ListarCategorias(); // aqui você chama a função
            setCategorias(dados.categorias);
        }
        CarregarCategorias();
    },[])

    useEffect(() => {
        if (action === 'edit' && produtoUpdate) {
            setTituloAcao('Editar');
            setDadosForm(produtoUpdate);
        }else if(action === 'cad'){
            setTituloAcao('Cadastrar');
            setDadosForm(Produtos);
        }else{
            setTituloAcao('Deletar');
            setDadosForm(produtoDelete);
        }
    }, [action, produtoUpdate]);


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
        if (!dadosForm.preco.trim()) novosErros.preco = 'Preço é obrigatório';
        if (dadosForm.categoria_id == 0) novosErros.categoria_id = 'Categoria é obrigatória';
    
        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const EnviarDadosApi = async (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            if(action == 'cad'){
                CadastrarProduto(dadosForm).then((resultado) =>{
                    if (resultado.sucesso) {
                        setMensagemNotificao('Produto cadastrado com Sucesso!')
                        setNotificacao(true);
                        setShowModal(false);
                        setDadosForm(Produtos);
                        atualizar();
                    } 
               }).catch(erros => {
                    console.log("ERROS DE CADASTRO");
               });
            }else if(action == 'edit'){
                AtualizarProduto(dadosForm).then((resultado) =>{
                    if (resultado.sucesso) {
                        setMensagemNotificao('Produto atualizado com Sucesso!')
                        setNotificacao(true);
                        setShowModal(false);
                        atualizar();
                    } 
               });
            }     
        } 
    };



    const RemoverProduto = async () => {
        
        DeletarProduto(produtoDelete).then((resultado) =>{
            if (resultado.sucesso) {
                setMensagemNotificao('Produto deletado com Sucesso!')
                setNotificacao(true);
                setShowModal(false);
                atualizar();
            } 
       });
    }

    function cancelar() {
        setShowModal(false);
    }
    

    return (
        <>
        <Notificacao mensagem={MensagemNotficao} notificacao={notificacao}   onClose={() => setNotificacao(false)}/>
         {ShowModal &&(
            <>
            <div className="modal-backdrop" ></div>
           
            <div className="modalCustom">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title">{TituloAcao} Produto</h5>
                    <button type="button"  onClick={() => cancelar()} className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <form  id="formProduto" onSubmit={EnviarDadosApi}>
                        {action != 'delete' && (
                            <div className="modal-body">
                            
                                    <input type="hidden" id="produtoId" name="id" value={dadosForm.id}/>
                                    <div className="mb-3">
                                        <label className="form-label">Nome do Produto</label>
                                        <input type="text" id="nome"  name="nome"  value={dadosForm.nome} onChange={handleChange} className={`form-control ${erros.nome ? 'is-invalid' : ''}`}/>
                                        {erros.nome && (<div className="invalid-feedback"> {erros.nome} </div> )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Preço (R$)</label>
                                        <input type="text"  id="preco" maxLength={10}  name="preco"  value={dadosForm.preco} onChange={handleChange}  className={`form-control ${erros.preco ? 'is-invalid' : ''}`}/>
                                        {erros.preco && (<div className="invalid-feedback"> {erros.preco} </div> )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Descrição </label>
                                        <div className="form-floating">
                                            <textarea  className={`form-control text-areaCustom ${erros.descricao ? 'is-invalid' : ''}`} placeholder="Leave a comment here" id="descricao" name="descricao"  value={dadosForm.descricao} onChange={handleChange}></textarea>
                                            <label> Descrição</label>
                                            {erros.descricao && (<div className="invalid-feedback"> {erros.descricao} </div> )}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label  className="form-label">Categoria</label>
                                        <select id="categoria" value={dadosForm.categoria_id} name="categoria_id"  onChange={handleChange} className={`form-select ${erros.categoria_id ? 'is-invalid' : ''}`}>
                                        <option value="">Nenhum</option>
                                    
                                        {categorias.map((categoriaItem, index) => {
                                            return (
                                                <option key={index}  value={ categoriaItem.id}>{categoriaItem.nome}</option>
                                            )
                                        })}

                                        </select>
                                        {erros.categoria_id && (<div className="invalid-feedback"> {erros.categoria_id} </div> )}
                                    </div>

                            </div>
                        )}
                        {action == 'delete' && (
                            <div className="modal-body">
                                <div className="mb-3">
                                    <p> Deseja realmente excluir o produto : </p> <span className="fw-bold"> {produtoDelete.nome} </span>
                                </div>

                            </div>

                        )}

                        <div className="modal-footer">
                            <button type="button"  onClick={() => cancelar()} className="btn btn-secondary me-4" data-bs-dismiss="modal">Cancelar</button>
                            {action != 'delete' && (
                                <button type="submit" className="btn btn-success">{TituloAcao}</button>
                            )}
                        
                            {action == 'delete' && (
                                <button onClick={() => RemoverProduto()} className="btn btn-danger">Deletar</button>
                            )}
                        </div>


                    
                    
                    </form>     
                </div>   {/** FECHA MODAL contento */}
            </div>   {/** FECHA MODAL CUSTOM */}
                      
            </>
        )}

        </>
    )
}

export default ModalAction;