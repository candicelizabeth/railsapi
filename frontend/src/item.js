//Needs to remembeer all the items 
//Responsible for setting the properties of each item 
//the html we want to put on the DOM for each item 
// Attach event listeners particular to each item 

class Item {
    static all = [];
    static container = document.getElementById('item-list');

    constructor({name, price, description, id, category_id}){
        this.name = name
        this.price = price
        this.description = description
        this.id = id
        this.category_id = category_id
        this.element = document.createElement('li')
        this.element.addEventListener('click', this.handleClick)
        // debugger
        Item.all.push(this)
    }

    render(){
        this.element.innerHTML = `
        <div>
       $<span class="price">${this.price}</span>
        <span class="name">${this.name}</span>
        <span class="description">${this.description}</span>
       </div>
       <button class="edit" data-id= "${this.id}" >Edit</button>
       <button class="delete" data-id= "${this.id}" >Delete</button>
       `
       return this.element
    }

    renderItem(){

        Item.container.appendChild(this.render())
        // form.reset()
        // li.addEventListener('click', handleClick)
    }

    handleClick = (e) => {
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
}