json.array! @user_groceries do |user_grocery|
  json.id user_grocery.grocery_id
  json.description user_grocery.grocery.description
  json.grocery_category user_grocery.grocery.grocery_category
  json.score_factor user_grocery.grocery.score_factor

  json.ingredients user_grocery.grocery.ingredients do |ingredient|
    json.ingredient_id ingredient.id
    json.ingredient_description ingredient.description  
  end
end