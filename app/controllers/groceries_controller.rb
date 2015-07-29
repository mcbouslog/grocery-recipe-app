class GroceriesController < ApplicationController

  def index
  end

  def show
    @groceries = Grocery.all
  end

end