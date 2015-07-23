class Api::V1::ApiIngredientsController < ApplicationController

  def index
    @ingredients = Ingredient.all
  end

  def user    
  end

end