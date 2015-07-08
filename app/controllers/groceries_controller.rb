class GroceriesController < ApplicationController

  def index
    @produces = Grocery.where(grocery_category: "produce")
  end
  
end
