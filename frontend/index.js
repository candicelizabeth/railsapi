
// make a fetch request to the '/items' and display items on the DOM

const ul = document.getElementById('item-list');
const form = document.getElementById('item-form');
const priceInput = document.getElementById('item-price');
const nameInput = document.getElementById('item-name');
const descriptionInput = document.getElementById('item-description');
const baseURL = 'http://localhost:3000/items'
form.addEventListener('submit', handleSubmit)

function handleSubmit(e){
    // debugger
    const itemInfo = {
        price: priceInput.value,
        name: nameInput.value,
        description: descriptionInput.value
    }
    // debugger
    e.preventDefault();
    const configObject = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(itemInfo)
    }
    fetch(baseURL, configObject)
    .then(r => r.json())
    .then(json => renderItem(json["data"]))
}

function getItems(){
fetch(baseURL)
.then(r => r.json())
.then(data => renderItems(data))
}



function renderItems(data){
    const items = data["data"];
    items.forEach((item) => {
        
        // debugger
        renderItem(item)
    })

    
    // debugger
}

function renderLiHTML(li, item){
    li.innerHTML = `
    <div>
   $<span class="price">${item["attributes"]["price"]}</span>
    <span class="name">${item["attributes"]["name"]}</span>
    <span class="description">${item["attributes"]["description"]}</span>
   </div>
   <button class="edit" data-id= "${item.id}" >Edit</button>
   <button class="delete" data-id= "${item.id}" >Delete</button>
   `
}
function renderItem(item){

    const li = document.createElement('li');
    // debugger
//     li.innerHTML = `
//     <div>
//    $<span class="price">${item["attributes"]["price"]}</span>
//     <span class="name">${item["attributes"]["name"]}</span>
//     <span class="description">${item["attributes"]["description"]}</span>
//    </div>
//    <button class="edit" data-id= "${item.id}" >Edit</button>
//    <button class="delete" data-id= "${item.id}" >Delete</button>
//    `
    renderLiHTML(li, item)
    ul.appendChild(li)
    form.reset()
    li.addEventListener('click', handleClick)
}

function handleClick(e){
    // debugger 
    if(e.target.innerText === "Delete"){
        // debugger
        const id = e.target.dataset.id 
        e.target.parentElement.remove()
        const configObject = {
            method: 'DELETE'
        }
        // debugger
        fetch(baseURL + `/${id}`, configObject)
        .then(r => r.json())
        .then(json => alert(json.message))

    }else if(e.target.innerText === "Edit"){
        // debugger
        e.target.innerText = 'Save'
        //change the innerText of my button to save 
        //have a edit form appear with values filled out 
        //change the information on db 
        //change the information on the frontend (changing the DOM)
        createEditFields(e.target)
    }else if(e.target.innerText === "Save"){
        e.target.innerText = 'Edit'
        saveUpdatedItem(e.target)
    }
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
getItems()