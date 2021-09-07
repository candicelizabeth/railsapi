
// make a fetch request to the '/items' and display items on the DOM

const ul = document.getElementById('item-list');
const form = document.getElementById('item-form');
const priceInput = document.getElementById('item-price');
const nameInput = document.getElementById('item-name');
const descriptionInput = document.getElementById('item-description');

fetch('http://localhost:3000/items')
.then(r => r.json())
.then(data => renderItems(data))

function renderItems(data){
    const items = data["data"];
    items.forEach((item) => {
        
        // debugger
        renderItem(item)
    })

    function renderItem(item){
        const li = document.createElement('li');
        li.innerHTML = `
        <div>
       $<span class="price">${item["attributes"]["price"]}</span>
        <span class="name">${item["attributes"]["name"]}</span>
        <span class="description">${item["attributes"]["description"]}</span>
       </div>`
        ul.appendChild(li)
    }
    // debugger
}