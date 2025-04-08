
import { useState } from "react";
import VitrineModal from "../component/VitrineModal";

function Home({categoriaID,CategoriaName,produtos}) {
  const [mostrar, setMostrar] = useState(false);
  const [produtoClick,setProdutoClick] = useState();
  
  const produtosFiltrados = produtos.filter(produto => produto.categoria.id === categoriaID);

  
  function ModalDetalhesProduto(produto){
    setMostrar(true);
    setProdutoClick(produto);
  }

  // console.log(produtosFiltrados);

  return (
      <>
      <VitrineModal mostrar={mostrar} OnsetMostrar={setMostrar} produto={produtoClick}/>
      
    
      
        
        <div className="container py-5">
       
        
            <div className="row g-4 d-flex justify-content-center"> 
            <h2 className="mb-4 text-center fw-bold">{CategoriaName}</h2>

            {produtosFiltrados.map((produtosItem, index) => {
             
             
              return (
              <>
               
                <div key={index} className="card product-card m-3"  style={{ width: '18rem', padding: 'unset' , height: '350px'}}>
                  <img
                    src={'/images/img2.jpg'}
                    className="card-img-top"
                    alt={CategoriaName}
                    
                    />
                    <div className="card-body text-center product-div">
                      <h5 className="product-name">{produtosItem.nome}</h5>
                      <p className="product-price"> {"R$"+produtosItem.preco}</p>
                      <a href="javascript:;" onClick={() => ModalDetalhesProduto(produtosItem)} className="btn btn-primary btn-sm">Ver Detalhes</a>
                    </div>
                </div>
             
                
              </>   
              )
              
            })}     
             
            </div>
          
        </div>
     
       


      
      
      
      
      </>

      
  );
}

export default Home;
