class Grocery < ActiveRecord::Base
  has_many :user_groceries
  has_many :users, through: :user_groceries

  has_many :grocery_ingredient_joins
  has_many :ingredients, through: :grocery_ingredient_joins
  
  has_many :grocery_shop_lists
  has_many :grocery_list_users, through: :grocery_shop_lists, source: :user
  
end
