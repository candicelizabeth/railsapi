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
            price: priceInput.value,
            name: nameInput.value,
            description: descriptionInput.value
        }
        // debugger
        
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
                i.renderItem()
        })
    }
}