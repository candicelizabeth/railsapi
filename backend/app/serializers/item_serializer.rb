class ItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :price, :description, :category_id, :naming
  belongs_to :category
end
