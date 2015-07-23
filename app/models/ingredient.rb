class Ingredient < ActiveRecord::Base
  has_many :user_ingredients
  has_many :users, through: :user_ingredients

  has_many :grocery_ingredient_joins
  has_many :groceries, through: :grocery_ingredient_joins

  has_many :user_shopping_lists
  has_many :shopper, through: :user_shopping_lists, source: :user
  
end
