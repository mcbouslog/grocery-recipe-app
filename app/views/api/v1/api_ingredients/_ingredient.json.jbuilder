json.id ingredient.id
json.description ingredient.description

json.groceries ingredient.groceries.map(&:description)

json.current_user ingredient.users.exists?(current_user) ? true : false

json.shop_list ingredient.ingredient_list_users.exists?(current_user) ? true : false