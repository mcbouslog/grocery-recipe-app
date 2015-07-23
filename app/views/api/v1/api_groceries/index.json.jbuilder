json.array! @groceries do |grocery|

  json.id grocery.id
  json.description grocery.description
  json.grocery_category grocery.grocery_category
  json.score_factor grocery.score_factor

  json.ingredients grocery.ingredients do |ingredient|
    json.ingredient_id ingredient.id
    json.ingredient_description ingredient.description  
  end

  json.current_user grocery.users.exists?(current_user) ? true : false

end