class Api::V1::ApiGroceriesController < ApplicationController

  def index
    @groceries = Grocery.all

  end

end