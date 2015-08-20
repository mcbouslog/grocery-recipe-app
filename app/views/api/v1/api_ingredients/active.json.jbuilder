if current_user

  json.active_ingredients @active_ingredients do |ingredient|
    json.id ingredient.id
    json.description ingredient.description

    json.groceries ingredient.groceries.map(&:description)

    json.current_user ingredient.users.exists?(current_user) ? true : false

    json.shop_list ingredient.ingredient_list_users.exists?(current_user) ? true : false
  end

  json.user do
    json.user_id current_user.id
  end

else

  json.user do
    json.user_id false
  end

end