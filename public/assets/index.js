
const divBebida = document.querySelector(".bebidas");
const spanBadge = document.querySelector("span.position-absolute");

const myModal = new bootstrap.Modal(document.getElementById("carrinhoModal"));

const btnCarrinho = document.querySelector("#btCarrinho");
const btnFinalizar = document.querySelector("#btFinalizar");
const btnLimpar = document.querySelector("#btLimpar");

const btnAdicionar = document.querySelector("#btnAdicionar");

const tabBebidas = document.querySelector("#tabBebida");

let bebidasCompradas;
let bebidas;

const carregaBebidas = async () => {
  try {
    const response = await axios.get("http://localhost:3000/bebidas");
    bebidas = response.data;

    let resposta = "";

    for (const bebida of bebidas) {
      resposta += `
        <div class="col-6 col-sm-5 col-md-4">
          <div class="card">
            <img src="${bebida.foto}" class="card-img-top" alt="${bebida.nome}">
            <div class="card-body">
              <h5 class="card-title">Tipo: ${
        bebida.tipo
      }</h5>
              <hr>
              <p class="card-text">${bebida.nome}</p>
              <hr>
              <p class="card-text">R$: 
                ${bebida.preco.toLocaleString("pt-br", {
                  minimumFractionDigits: 2,
                })}
              </p>
              <button class="btn btn-primary btAdicionar" id="btnAdicionar">Adicionar</button>
            </div>
          </div>    
        </div>  
      `;
    }
    divBebida.innerHTML = resposta;

    bebidasCompradas = localStorage.getItem("bebidas")
      ? localStorage.getItem("bebidas").split(";")
      : [];

    spanBadge.innerText = bebidasCompradas.length;
  } catch (error) {
    console.error("Erro ao carregar bebidas:", error);
  }
};

window.addEventListener("load", carregaBebidas);

divBebida.addEventListener("click", (e) => {
  if (e.target.classList.contains("btAdicionar")) {
    const div = e.target.parentElement;
    const tagH5 = div.querySelector("h5");
    const nomeBebida = div.querySelector(".card-text").innerText;
    const tipoBebida = tagH5.innerText.split("\nTipo: ")[1];
    const precoBebida = parseFloat(div.querySelector(".card-text + hr + p").innerText.split("R$: ")[1].replace(",", ".")); // Correção na seleção do preço

    const bebidaObj = {
      nome: nomeBebida,
      tipo: tipoBebida,
      preco: precoBebida,
    };

    bebidasCompradas.push(bebidaObj);
    spanBadge.innerText = bebidasCompradas.length;
    localStorage.setItem("bebidas", bebidasCompradas.map(bebida => bebida.id).join(";"));

    console.log(bebidasCompradas);
  }
});

btnCarrinho.addEventListener("click", async () => {
  myModal.show();

  try {
    // Obter os dados das bebidas
    const response = await axios.get("http://localhost:3000/bebidas");
    bebidas = response.data;

    // Limpar a tabela de bebidas
    for (let i = tabBebidas.rows.length - 1; i >= 1; i--) {
      tabBebidas.deleteRow(i);
    }

    let total = 0;

    for (const item of bebidasCompradas) {
      // Encontre a bebida correta pelo ID na lista de bebidas
      const bebida = bebidas.find((bebida) => bebida.nome === item.nome);

      if (bebida) {
        // Adicione a bebida na tabela de bebidas do carrinho
        const linha = tabBebidas.insertRow(-1);

        const col1 = linha.insertCell(0);
        const col2 = linha.insertCell(1);
        const col3 = linha.insertCell(2);

        col1.innerHTML = `<img src="${bebida.foto}" alt="${bebida.nome}" width="80">`;
        col2.innerText = bebida.nome;
        const precoFormatado = parseFloat(bebida.preco).toFixed(2).replace(".", ",");
        col3.innerText = precoFormatado;
        
        col3.classList.add("text-end");

        total = total + parseInt(bebida.preco);
      }
    }

    // Adicione a linha com o total no final da tabela de bebidas
    const linhaTotal = tabBebidas.insertRow(-1);
    const col1Total = linhaTotal.insertCell(0);
    const col2Total = linhaTotal.insertCell(1);
    const col3Total = linhaTotal.insertCell(2);

    col2Total.innerText = "Total R$: ";
    const totalNumero = Number.isNaN(parseFloat(total)) ? 0 : parseFloat(total);
    const totalFormatado = totalNumero.toFixed(2).replace(".", ",");
    col3Total.innerText = totalFormatado;


    col2Total.classList.add("text-end");
    col3Total.classList.add("text-end");
  } catch (error) {
    console.error("Erro ao carregar bebidas:", error);
  }

  console.log(bebidasCompradas);
});


btnFinalizar.addEventListener("click", async () => {
  myModal.hide();
  try {
    // Obter os dados das bebidas
    const response = await axios.get("http://localhost:3000/bebidas");
    const bebidas = response.data;

    for (const item of bebidasCompradas) {
      // Encontre a bebida correta pelo ID na lista de bebidas
      const bebida = bebidas.find((bebida) => bebida.id === item);

      if (bebida && bebida.estoque > 0) {
        // Atualizar o estoque no banco de dados subtraindo 1
        await axios.put(`http://localhost:3000/bebidas/${bebida.id}`, {
          ...bebida,
          estoque: bebida.estoque - 1,
        });
      }
    }

    localStorage.removeItem("bebidas");

    alert("Valeu fera! Sua Bebida chegará em 5 min");

    carregaBebidas();
  } catch (error) {
    console.error("Erro ao finalizar compra:", error);
  }
});


// btnFinalizar.addEventListener("click", () => {
//   myModal.hide();

//   localStorage.removeItem("bebidas");

//   alert("Valeu fera! Sua Bebida chegará em 5 min");

//   carregaBebidas();
// });

btnLimpar.addEventListener("click", () => {
  localStorage.removeItem("bebidas");
  myModal.hide()

  for (let i = tabBebidas.rows.length - 1; i >= 1; i--) {
    tabBebidas.deleteRow(i);
  }

  let total = 0;

  const linha = tabBebidas.insertRow(-1);

  const col1 = linha.insertCell(0);
  const col2 = linha.insertCell(1);
  const col3 = linha.insertCell(2);

  col2.innerText = "Total R$: ";
  col3.innerText = total.toLocaleString("pt-br", { minimumFractionDigits: 2 });

  col2.classList.add("text-end");
  col3.classList.add("text-end");

  alert("Itens Removidos do carrinho");

  carregaBebidas();
});
