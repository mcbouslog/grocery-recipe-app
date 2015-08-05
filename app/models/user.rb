class User < ActiveRecord::Base
  has_many :user_groceries
  has_many :groceries, through: :user_groceries

  has_many :grocery_shop_lists
  has_many :list_groceries, through: :grocery_shop_lists, source: :grocery

  has_many :user_ingredients
  has_many :ingredients, through: :user_ingredients 

  has_many :ingredient_shop_lists
  has_many :list_ingredients, through: :ingredient_shop_lists, source: :ingredient

  has_many :user_recipes
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

end
