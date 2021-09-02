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
end
