import { useEffect, useState } from 'react';
function Notificacao({mensagem,notificacao,onClose }) {
    

    const [visivel, setVisivel] = useState(notificacao);

    useEffect(() => {
        setVisivel(notificacao);
    
        if (notificacao) {
          const timeout = setTimeout(() => {
            setVisivel(false);
            onClose(); // notifica o pai que o toast sumiu
          }, 3000);
    
          return () => clearTimeout(timeout);
        }
      }, [notificacao, onClose]);

      if (!visivel) return null;
    return (
        <div
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: 9999 }}
        >
          <div className="toast show align-items-center text-white bg-success border-0">
            <div className="d-flex">
              <div className="toast-body">{mensagem}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => {
                  setVisivel(false);
                  onClose();
                }}
              ></button>
            </div>
          </div>
        </div>
      );
}


export default Notificacao