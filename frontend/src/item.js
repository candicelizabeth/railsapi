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
        this.categoryId = category_id
        this.element = document.createElement('li')
        this.element.addEventListener('click', this.handleClick)
        // debugger
        Item.all.push(this)
    }

    static filteredByCategory(filteredCategory){
        if(filteredCategory){
        for(const i of Item.all){
            if(i.categoryId === parseInt(filteredCategory.id)){
                i.element.style.display = ""
            }else{
               i.element.style.display = "none" 
            }
        }
    }else{
        for(const i of Item.all){
            i.element.style.display = ""
        }
    }
        // debugger
        // if(filteredCategory){
        //     const filteredItems = Item.all.filter((i) => {
        //         // debugger
        //         return i.categoryId === parseInt(filteredCategory.id)
        //     })
        //     Item.container.innerHTML = "";
        //     for(const item of filteredItems){
        //         item.renderItem()
        //     }
        // }else{
        //     Item.container.innerHTML = "";
        //     for(const item of Item.all){
        //         item.renderItem()
        //     }

        // }
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
        itemApi.deleteItem(e)
    
        }else if(e.target.innerText === "Edit"){
            // debugger
            e.target.innerText = 'Save'
            //change the innerText of my button to save 
            //have a edit form appear with values filled out 
            //change the information on db 
            //change the information on the frontend (changing the DOM)
            this.createEditFields(e.target)
        }else if(e.target.innerText === "Save"){
            e.target.innerText = 'Edit'
            this.saveUpdatedItem(e.target)
        }
    }

    createEditFields(){
        const div = this.element.querySelector('div');
        // debugger
          for(const element of div.children){
            let inputValue = element.innerText;
            let name = element.classList[0];
            // debugger
            element.outerHTML = `<input type="text" class="edit-${name}" value="${inputValue}" />`
            // debugger 
        }
    }

    saveUpdatedItem(){
    
        this.price = this.element.querySelector(".edit-price").value;
        this.name = this.element.querySelector(".edit-name").value;
        this.description = this.element.querySelector(".edit-description").value;
    itemApi.updateItem(this)
    //     const itemInfo = {
    //        price: priceInput.value,
    //        name: nameInput.value,
    //        description: descriptionInput.value
    //    }
       // debugger
       // e.preventDefault();
       
   }
}