import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight,faArrowLeft} from '@fortawesome/free-solid-svg-icons';
function Paginacao({mudarPagina,pagina,totalPaginas}) {
    
    return (
        <div>
          <div className="paginacao d-flex justify-content-end align-items-center">
            <button type="button" className="btn btn-secondary me-4 text-white" onClick={() => mudarPagina(pagina - 1)} disabled={pagina === 1}>
            <FontAwesomeIcon icon={faArrowLeft}/>
            </button>
    
            <span>Página {pagina} de {totalPaginas}</span>
    
            <button type="button" className="btn btn-secondary ms-4 text-white" onClick={() => mudarPagina(pagina + 1)} disabled={pagina === totalPaginas}>
              <FontAwesomeIcon icon={faArrowRight}/>
            </button>
          </div>
        </div>
      );
}

export default Paginacao