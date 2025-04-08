

function VitrineModal({mostrar,OnsetMostrar,produto}) {
    


    return (
        <>
        {mostrar && (
            <div className="modal show d-block d-flex justify-content-center" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{produto.nome}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => OnsetMostrar(false)}
                  ></button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-6">
                        <img
                          src={'/images/img2.jpg'}
                          className="card-img-top"
                          
                         
                          />
                        </div>
                        <div className="col-md-6">
                            <div className="content">
                                <h5>Preço:</h5>
                                <p>{"R$"+produto.preco}</p>
                            </div>

                            <div className="content">
                                <h5>Descrição:</h5>
                                <p>{produto.descricao}</p>
                            </div>
                            <div className="content">
                                <h5>Categoria:</h5>
                                <p>{produto.categoria.nome}</p>
                            </div>

                        </div>
                       
                    </div>
                   
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                     onClick={() => OnsetMostrar(false)}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        )}
        </>
    )

}


export default VitrineModal;