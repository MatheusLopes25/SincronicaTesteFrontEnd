export async function ListarProdutos(pagina = 1) {
  console.log("ListarProdutos");
    try {
        const resposta = await fetch('http://127.0.0.1:8000/api/v1/produtos?por_pagina=10&pagina='+pagina,{method:'GET'}); // URL da API
        if (!resposta.ok) {
          throw new Error(`Erro: ${resposta.status}`);
        }
    
        const response = await resposta.json(); // converte JSON
     
       return response; 
       
      } catch (erro) {
        console.error('Erro ao buscar produtos:', erro);
      }
}


export async  function CadastrarProduto(dataProduto) {
    let  response = {}
    try {
      await fetch('http://127.0.0.1:8000/api/v1/produtos',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataProduto)
      
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

export async  function AtualizarProduto(dataProduto) {
 
  let  response = {}
  try {
    await fetch('http://127.0.0.1:8000/api/v1/produtos/'+dataProduto.id,{
      method:'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataProduto)
    
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

export async  function DeletarProduto(dataProduto) {
  
  let response = {}
  try {
    await fetch('http://127.0.0.1:8000/api/v1/produtos/'+dataProduto.id,{
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(data => {
      response = data;
    })
  
    return { sucesso: true , dados:response};
  } catch (erro) {
    return { sucesso: true, dados : erro };
  }
}