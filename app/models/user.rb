class User < ActiveRecord::Base
  has_many :user_groceries
  has_many :groceries, through: :user_groceries

  has_many :user_shopping_lists
  has_many :groceries, through: :user_shopping_lists
  
  has_many :user_ingredients
  has_many :ingredients, through: :user_ingredients 

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
