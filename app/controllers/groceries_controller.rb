class GroceriesController < ApplicationController

  def index
  end

  def show
  end

  def update
    user_groceries = UserGrocery.where(user_id: 1)
    user_groceries.each do |user_grocery|
      user_grocery.destroy
    end
    user_groceries = params[:user_groceries]
    user_groceries.each do |user_grocery|
      UserGrocery.create(user_id: 1, grocery_id: user_grocery)
    end
  end
  
end