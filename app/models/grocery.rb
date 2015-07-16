class Grocery < ActiveRecord::Base
  has_many :user_groceries
  has_many :users, through: :user_groceries

  has_many :user_shopping_lists
  has_many :users, through: :user_shopping_lists
  
  has_many :grocery_ingredient_joins
  has_many :ingredients, through: :grocery_ingredient_joins
  
end
