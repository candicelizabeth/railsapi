
// make a fetch request to the '/items' and display items on the DOM
const port = 'http://localhost:3000';
const itemApi = new ItemApi(port);
// debugger
const ul = document.getElementById('item-list');
const form = document.getElementById('item-form');
const priceInput = document.getElementById('item-price');
const nameInput = document.getElementById('item-name');
const descriptionInput = document.getElementById('item-description');
const baseURL = 'http://localhost:3000/items'
form.addEventListener('submit', handleSubmit)

function handleSubmit(e){
    e.preventDefault();
    itemApi.createItems();
    e.target.reset();
    // debugger
    
}

function createEditFields(editBtn){
    const div = editBtn.previousElementSibling;
    
    // const price = div.children[0].innerText
    // const name = div.children[1].innerText
    // const description = div.children[2].innerText
    // // debugger 
    // div.innerHTML = 
    // `<input type="number" id ="edit-${price}" value= "${price}">
    // <input type="text" id ="edit-${name}" value= "${name}">
    // <input type="text" id = "edit-${description}" value= "${description}">
    // `
    // debugger
    for(const element of div.children){
        let inputValue = element.innerText;
        let name = element.classList[0];
        // debugger
        element.outerHTML = `<input type="text" class="edit-${name}" value="${inputValue}" />`
        // debugger 
    }
}

function saveUpdatedItem(saveBtn){
    
     const li = saveBtn.parentElement
     const priceInput = li.querySelector(".edit-price");
     const nameInput = li.querySelector(".edit-name");
     const descriptionInput = li.querySelector(".edit-description");
     const id = saveBtn.dataset.id
    //  debugger

     const itemInfo = {
        price: priceInput.value,
        name: nameInput.value,
        description: descriptionInput.value
    }
    // debugger
    // e.preventDefault();
    const configObject = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(itemInfo)
    }
    fetch(`${baseURL}/${id}`, configObject)
    .then(r => r.json())
    .then(json => {
        // debugger
        renderLiHTML(li, json.data)
    })
}

itemApi.getItems()