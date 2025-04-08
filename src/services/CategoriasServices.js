export async function ListarCategorias(pagina = 1) {
    try {
        const resposta = await fetch('http://127.0.0.1:8000/api/v1/categorias?por_pagina=10&pagina='+pagina,{method:'GET'}); // URL da API
        if (!resposta.ok) {
          throw new Error(`Erro: ${resposta.status}`);
        }
    
        const response = await resposta.json(); // converte JSON
     
       return response; 
       
      } catch (erro) {
        console.error('Erro ao buscar produtos:', erro);
      }
}



export async  function CadastrarCategoria(dataCategoria) {
  let  response = {}
  try {
    await fetch('http://127.0.0.1:8000/api/v1/categorias',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataCategoria)
    
    }).then(response => response.json())
    .then(data => {
      response = data;
    })
    .catch(error => {
      console.error('Erro:', error);
      return { error: false};
    }); 
    return { sucesso: true, dados: response };
  } catch (erro) {
    console.error('Erro ao buscar produtos:', erro);
  }
}

export async  function AtualizarCategoria(dataCategoria) {

  let  response = {}
  try {
    await fetch('http://127.0.0.1:8000/api/v1/categorias/'+dataCategoria.id,{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataCategoria)
    
    }).then(response => response.json())
    .then(data => {
      response = data;
    })
    .catch(error => {
      console.error('Erro:', error);
      return { error: false};
    }); 
    return { sucesso: true, dados: response };
  } catch (erro) {
    console.error('Erro ao atualizar produtos:', erro);
  }
}

export async  function DeletarCategoria(dataCategoria) {
  let  resultado = {}
  try {
    await fetch('http://127.0.0.1:8000/api/v1/categorias/'+dataCategoria.id,{
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(data => {
      resultado = data;
    })
 
    return { sucesso: true, dados : resultado };
  } catch (erro) {
    return { sucesso: true, dados : erro };
  }
}


