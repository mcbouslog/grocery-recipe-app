class RecipesController < ApplicationController
  before_action :authenticate_user!, except: [:index]

  def show
  end

end