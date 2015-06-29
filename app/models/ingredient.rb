class Ingredient < ActiveRecord::Base
  has_many :grocery_ingredient_joins
  has_many :groceries, through: :grocery_ingredient_joins
  
end
