class ItemSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :price, :description, :category_id, :naming, :category_name
  belongs_to :category
end
