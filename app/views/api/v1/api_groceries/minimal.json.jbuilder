json.array! @groceries do |grocery|

  json.id grocery.id
  json.description grocery.description
  json.grocery_category grocery.grocery_category

  json.current_user grocery.users.exists?(current_user) ? true : false

  json.shop_list grocery.grocery_list_users.exists?(current_user) ? true : false

end