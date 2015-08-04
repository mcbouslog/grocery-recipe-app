class Api::V1::ApiGroceriesController < ApplicationController
  skip_before_filter :verify_authenticity_token
  
  def index
    @groceries = Grocery.all

  end

  def minimal
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
    respond_to do |format|
      format.all { render :nothing => true, :status => 200 }
    end
  end

  def shop_list
    user_grocery_shopitems = GroceryShopList.where(user_id: current_user.id)
    user_grocery_shopitems.each do |user_grocery_shopitem|
      user_grocery_shopitem.destroy
    end
    user_grocery_shopitems = params[:shop_list_groceries]
    user_grocery_shopitems.each do |user_grocery_shopitem|
      GroceryShopList.create(user_id: current_user.id, grocery_id: user_grocery_shopitem)
    end
    respond_to do |format|
      format.all { render :nothing => true, :status => 200 }
    end
  end

end