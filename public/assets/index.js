const divBebida = document.querySelector(".bebidas");
const spanBadge = document.querySelector("span.position-absolute");

const myModal = new bootstrap.Modal(document.getElementById("carrinhoModal"));

const btnCarrinho = document.querySelector("#btCarrinho");
const btnFinalizar = document.querySelector("#btFinalizar");
const btnLimpar = document.querySelector("#btLimpar")

const tabBebidas = document.querySelector("#tabBebida");

let bebidasCompradas;
let bebidas;

const carregaBebidas = async () => {
  const dados = await axios.get("./databases/ratao.db");

  bebidas = dados.data;

  let resposta = "";

  for (const bebida of bebidas) {
    resposta += `
    <div class="col-6 col-sm-4 col-md-3">
      <div class="card">
      <img src="${bebida.foto}" class="card-img-top" alt="tragos">
        <div class="card-body">
          <h5 class="card-title">${bebida.id} - ${bebida.marca}</h5>
          <p class="card-text">${bebida.tipo}</p>
          <p class="card-text">R$: 
${bebida.preco.toLocaleString("pt-br", { minimumFractionDigits: 2 })}</p>
          <button class="btn btn-primary btAdicionar">Adicionar</button>
        </div>
      </div>    
    </div>  
    `;
  }

  divBebida.innerHTML = resposta;

  bebidasCompradas = localStorage.getItem("./databases/ratao.db")
    ? localStorage.getItem("bebidas").split(";")
    : [];

  spanBadge.innerText = bebidasCompradas.length;
};

window.addEventListener("load", carregaBebidas);

divBebida.addEventListener("click", (e) => {
  if (e.target.classList.contains("btAdicionar")) {
    const div = e.target.parentElement;

    const tagH5 = div.querySelector("h5");

    const idNome = tagH5.innerText;

    const partes = idNome.split("-");

    const id = partes[0];

    bebidasCompradas.push(id);

    spanBadge.innerText = bebidasCompradas.length;

    localStorage.setItem("bebidas", bebidasCompradas.join(";"));
  }
});

btnCarrinho.addEventListener("click", () => {
  myModal.show();

  for (let i = tabBebidas.rows.length - 1; i >= 1; i--) {
    tabBebidas.deleteRow(i);
  }

  let total = 0;

  for (const item of bebidasCompradas) {
    const bebida = bebidas.filter((aux) => aux.id == item)[0];

    const linha = tabBebidas.insertRow(-1);

    const col1 = linha.insertCell(0);
    const col2 = linha.insertCell(1);
    const col3 = linha.insertCell(2);

    col1.innerHTML = `<img src="${bebida.foto}" alt="${bebida.marca}" width="80">`;
    col2.innerText = bebida.marca;
    col3.innerText = bebida.preco.toLocaleString("pt-br", {
      minimumFractionDigits: 2,
    });
    col3.classList.add("text-end");

    total = total + bebida.preco;
  }

  const linha = tabBebidas.insertRow(-1);

  const col1 = linha.insertCell(0);
  const col2 = linha.insertCell(1);
  const col3 = linha.insertCell(2);

  col2.innerText = "Total R$: ";
  col3.innerText = total.toLocaleString("pt-br", { minimumFractionDigits: 2 });

  col2.classList.add("text-end");
  col3.classList.add("text-end");
});

btnFinalizar.addEventListener("click", () => {
  myModal.hide();

  localStorage.removeItem("./databases/ratao.db");

  alert("Valeu fera! Sua Bebida chegará em 5 min");

  carregaBebidas();
});

btnLimpar.addEventListener("click", () => {

  localStorage.removeItem("./databases/ratao.db");
 
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
