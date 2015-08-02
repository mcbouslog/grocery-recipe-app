class Ingredient < ActiveRecord::Base
  has_many :user_ingredients
  has_many :users, through: :user_ingredients

  has_many :grocery_ingredient_joins
  has_many :groceries, through: :grocery_ingredient_joins

  has_many :ingredient_shop_lists
  has_many :ingredient_list_users, through: :ingredient_shop_lists, source: :user
  
end
