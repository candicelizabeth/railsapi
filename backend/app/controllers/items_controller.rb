class ItemsController < ApplicationController
    def index
        items = Item.all 
        # render json: items.to_json(except: [:created_at, :updated_at], include: {category: {only: [:name]}})
        render json: ItemSerializer.new(items, {include: [:category]})
    end

    def show 
        item = Item.find_by_id(params[:id]) 
        render json: item.to_json(except: [:created_at, :updated_at], include: {category: {only: [:name]}})
    end

    def create 
        item = Item.new(item_params)
        item.category = Category.last ##NEEDS TO CHANGE!!!!!
        if item.save 
            render json: ItemSerializer.new(item)
        else
            render json: {error: "Couldn't save"}
        end
    end

    def destroy 
        item = Item.find_by_id(params[:id])
        item.destroy 
        render json: {message: "Successfully deleted #{item.name}"}
    end


    private 
    
    def item_params 
        params.require(:item).permit(:name, :description, :price)
    end
end
