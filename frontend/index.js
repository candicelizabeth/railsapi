// make a fetch request to the '/items' and display items on the DOM
fetch('http://localhost:3000/items')
.then(r => r.json())
.then(data => renderItems(data))

function renderItems(data){
    const items = data["data"];
    const ul = document.getElementById('item-list');
    items.forEach((item) => {
        const li = document.createElement('li');
        li.innerText = `${item["attributes"]["name"]} - ${item["attributes"]["price"]}`
        ul.appendChild(li)
        // debugger

    })
    // debugger
}