json.array! @groceries do |grocery|

  json.id grocery.id
  json.description grocery.description
  json.grocery_category grocery.grocery_category
  json.score_factor grocery.score_factor

  json.ingredients grocery.ingredients.map(&:description)

  json.current_user grocery.users.exists?(current_user) ? true : false

  json.shop_list grocery.grocery_list_users.exists?(current_user) ? true : false

end