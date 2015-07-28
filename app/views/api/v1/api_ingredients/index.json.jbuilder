json.array! @ingredientsAll do |ingredient|

  json.id ingredient.id
  json.description ingredient.description

  json.groceries ingredient.groceries do |grocery|
    json.grocery_id grocery.id
    json.grocery_description grocery.description  
  end

end