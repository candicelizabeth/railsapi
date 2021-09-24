//handling fetch requests for my items 
class ItemApi {
    constructor(port){
        this.baseURL = `${port}/items`
    }

    getItems(){
        fetch(this.baseURL)
        .then(r => r.json())
        .then(data => {
            data["data"].forEach((item) => {
                const i = new Item({id:item.id, ...item.attributes})
                i.renderItem()
            })
        })
        }

    createItems(){

        const itemInfo = {
            item:{
            price: priceInput.value,
            name: nameInput.value,
            description: descriptionInput.value,
            // category_id: dropdown.value
            category_name: categoryInput.value
            }
        }
        //  debugger
        
        const configObject = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(itemInfo)
        }
        fetch(this.baseURL, configObject)
        .then(r => r.json())
        .then(json => {
            // debugger
            const i = new Item({id:json.data.id, ...json.data.attributes})

            // debugger
            const cat = Category.all.find(c => parseInt(c.id) === i.categoryId)
            if(!cat){
                
                let catObj = new Category({id: json.data.attributes.category_id, name: json.data.attributes.category_name})
                catObj.addToDom()
                catObj.addToDropDown()
            }
            // debugger
                i.renderItem()
        })
    }

    updateItem(item){

        const {price, name, description, id} = item

        const itemInfo = {price, name, description}
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
            //  debugger
            item.render()
        })
    }

    deleteItem(e){
        const id = e.target.dataset.id 
        e.target.parentElement.remove()
        const configObject = {
            method: 'DELETE'
        }
        // debugger
        fetch(baseURL + `/${id}`, configObject)
        .then(r => r.json())
        .then(json => alert(json.message))
    }
}