function nextId() {
    const prods = readAll();
  
    const ids = prods.map((prod) => prod.id);
  
    const maxId = Math.max(...ids);
  
    return maxId + 1;
  }
  
  function load(newProds) {
    localStorage.setItem('prods-app:prods', JSON.stringify(newProds));
  }
  
  function create(prod) {
    prod = { id: nextId(), ...prod };
  
    const prods = readAll();
  
    const newProds = [...prods, prod];
  
    load(newProds);
  
    return prod;
  }
  
  function readAll() {
    return JSON.parse(localStorage.getItem('prods-app:prods'));
  }
  
  function read(id) {
    const prods = readAll();
  
    const prod = prods.find((prod) => prod.id === id);
  
    return prod;
  }
  
  function update(id, prod) {
    const prods = readAll();
  
    const index = prods.findIndex((prod) => prod.id === id);
  
    if (index >= 0) {
      prods[index] = { id, ...prod };
    }
  
    load(prods);
  
    return prod;
  }
  
  function destroy(id) {
    const prods = readAll();
  
    const index = prods.findIndex((prod) => prod.id === id);
  
    if (index >= 0) {
      prods.splice(index, 1);
    }
  
    load(prods);
  }
  
  export default { load, create, readAll, read, update, destroy };