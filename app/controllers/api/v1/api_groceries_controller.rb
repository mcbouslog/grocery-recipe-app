class Api::V1::ApiGroceriesController < ApplicationController
  skip_before_filter :verify_authenticity_token
  
  def index
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

end