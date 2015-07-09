class GroceriesController < ApplicationController

  def index
    @produces = Grocery.where(grocery_category: "produce")
  end

  def create
  end

  def show
    @produces = Grocery.where(grocery_category: "produce")
  end

  def edit    
  end

  def update
    user_groceries = User_grocery.where(user_id: current_user.id)
    # user_groceries.each do |user_grocery|
    #   user_grocery.destroy
    # end

  end
  
end