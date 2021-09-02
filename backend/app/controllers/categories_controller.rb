class CategoriesController < ApplicationController

    def index 
        category = Category.all 
        render json: CategorySerializer.new(category, {include: [:items]})
    end
end
