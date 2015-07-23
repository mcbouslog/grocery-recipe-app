class Api::V1::ApiGroceriesController < ApplicationController

  def index
    @groceries = Grocery.all
  end

  def user
    @user_groceries = UserGrocery.where(user_id: current_user.id)
  end

end