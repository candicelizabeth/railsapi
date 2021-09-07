
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
function renderItem(item){

    const li = document.createElement('li');
    // debugger
    li.innerHTML = `
    <div>
   $<span class="price">${item["attributes"]["price"]}</span>
    <span class="name">${item["attributes"]["name"]}</span>
    <span class="description">${item["attributes"]["description"]}</span>
   </div>
   <button class="edit" data-id= "${item.id}" >Edit</button>
   <button class="delete" data-id= "${item.id}" >Delete</button>
   `
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

    }
}
getItems()