class GroceriesController < ApplicationController

  def index
    @produces = Grocery.where(grocery_category: "produce")
    @meats = Grocery.where("grocery_category LIKE ? OR grocery_category LIKE ?", "meat", "seafood")
    @bakery_dairies = Grocery.where("grocery_category LIKE ? OR grocery_category LIKE ?", "bakery", "dairy")
    @other_frigs = Grocery.where(grocery_category: "other_frig")
    @other_dries = Grocery.where(grocery_category: "other_dry")
    @sauces_spices = Grocery.where("grocery_category LIKE ? OR grocery_category LIKE ?", "spices", "sauces")
  end

  def show
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
    redirect_to "/groceries"
  end
  
end