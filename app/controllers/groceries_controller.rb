class GroceriesController < ApplicationController

  def index
    @produces = Grocery.where(grocery_category: "produce")
    @meats = Grocery.where(grocery_category: "meats")
  end

  def create
  end

  def show
    @produces = Grocery.where(grocery_category: "produce")
  end

  def edit    
  end

  def update
    user_groceries = UserGrocery.where(user_id: current_user.id)
    user_groceries.each do |user_grocery|
      user_grocery.destroy
    end
    user_groceries = params[:user_groceries]
    user_groceries.each do |user_grocery|
      UserGrocery.create(user_id: current_user.id, grocery_id: user_grocery, stock: true)
    end
    redirect_to "/groceries/#{current_user.id}"
  end
  
end