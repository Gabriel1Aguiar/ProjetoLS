import dataset from './model/dataset.js';
import prod from './model/prod.js'

const formProd = document.querySelector('#formProd')

function loadProds(){
    if (localStorage.getItem('prods-app:loaded') !== 'ok') {
        prod.load(dataset)
        localStorage.setItem('prods-app:loaded', 'ok')
    }

    for(const produto of prod.readAll()) {
        createProdCard(produto);
    }
}

function createProdActions(produto){
    return `<i
        class="far fa-trash-alt" 
        onclick="loadFormDeleteProd(${produto.id}, '${produto.name}')" 
        data-toggle="modal" 
        data-target="#deleteProdModal">
    </i>
    <i
        class="fas fa-pencil-alt" 
        onclick="loadFormUpdateProd(${produto.id}, '${produto.name}', '${produto.image}')" 
        data-toggle="modal" 
        data-target="#formProdModal">
    </i>`
}


function createProdCard(produto) {
    const card = `<div class="card-prod col-sm-6 col-lg-4 col-xl-3 mb-3" id="prod-${produto.id}">
        <div class="card">
            <div class="card-header text-center font-weight-bold">
                <span class="prod-name">
                    ${produto.name}
                </span>
                <span class="prod-actions float-right">
                    ${createProdActions(produto)}
                </span>
            </div>
            <div class="card-body p-0">
                <img src="${produto.image}" alt="camisa1" class="prod-image w-100">
            </div>
        </div>
    </div>`;

    const cardDeck = document.querySelector('.card-deck');

    cardDeck.insertAdjacentHTML('beforeend', card)
}

function loadFormValues(title, produtoName, produtoImage) {
    const formLabel = document.querySelector('#formProdLabel');
    const produtoNameInput = document.querySelector('#prod-name');
    const produtoImageInput = document.querySelector('#prod-image');
  
    formLabel.innerHTML = title;
    produtoNameInput.value = produtoName;
    produtoImageInput.value = produtoImage;
}

function loadFormCreateProduto() {
    loadFormValues('Inserir novo produto', '', '')
    
    formProd.onsubmit = (e) => {
        e.preventDefault();

        const produto = Object.fromEntries(new FormData(formProd))

        const newProduto = prod.create(produto)

        createProdCard(newProduto)

        $('#formProdModal').modal('toggle')
    }
}

function loadFormUpdateProd(id, name, image) {
    loadFormValues('Atualizar produto', name, image)
    
    formProd.onsubmit = (e) => {
        e.preventDefault();

        const produto = Object.fromEntries(new FormData(formProd))

        prod.update(id, produto)

        updateProdutoCard({id, ...produto})

        $('#formProdModal').modal('toggle')
    }
}

function loadFormDeleteProd(prodId, prodName){
    document.querySelector('#modal-name-prod').innerHTML = prodName

    document.querySelector('#deleteProdBtn').onclick = (e) => {
        e.preventDefault();

        prod.destroy(prodId)

        document.querySelector(`#prod-${prodId}`).remove()
        
        $('#deleteProdModal').modal('toggle')
    }
}

function updateProdutoCard(produto){
    document.querySelector(`#prod-${produto.id} .prod-name`).innerText = produto.name
    document.querySelector(`#prod-${produto.id} .prod-image`).src = produto.image
    document.querySelector(`#prod-${produto.id} .prod-actions`).innerHTML = createProdActions(produto)
}

window.loadFormCreateProduto = loadFormCreateProduto
window.loadFormDeleteProd = loadFormDeleteProd
window.loadFormUpdateProd = loadFormUpdateProd

loadProds()