class GroceriesController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
  end

  def show
    @groceries = Grocery.all
  end

  def update
    user_groceries = UserGrocery.where(user_id: current_user.id)
    user_groceries.each do |user_grocery|
      user_grocery.destroy
    end
    user_groceries = params[:user_groceries]
    user_groceries.each do |user_grocery|
      UserGrocery.create(user_id: current_user.id, grocery_id: user_grocery)
    end
  end
  
end