Rails.application.routes.draw do

  root to: 'groceries#index'
  devise_for :users

  #GROCERIES
  get 'groceries' => 'groceries#index'
  get 'groceries/shop_list' => 'groceries#show'
  get 'about-us' => 'groceries#about'
  get 'contact-us' => 'groceries#contact'


  #RECIPES
  get 'recipes' => 'recipes#index'
  get 'recipes/favorites' => 'recipes#show'

  #APIs
  namespace :api do
    namespace :v1 do

      get 'api_groceries' => 'api_groceries#index'
      post 'api_groceries' => 'api_groceries#update'
      get 'api_groceries/minimal' => 'api_groceries#minimal'
      post 'api_groceries/shop_list' => 'api_groceries#shop_list'
      
      get 'api_ingredients' => 'api_ingredients#index'
      post 'api_ingredients' => 'api_ingredients#update'
      post 'api_ingredients/shop_list' => 'api_ingredients#shop_list'      
      get 'api_ingredients/active' => 'api_ingredients#active'
      get 'api_ingredients/search_all' => 'api_ingredients#search_all'
      get 'api_ingredients/join' => 'api_ingredients#join'
      
      post 'api_searches' => 'api_searches#index'
      post 'api_searches/recipe' => 'api_searches#show'
      get 'api_searches/favorite_recipes' => 'api_searches#favorite_recipes'
      get 'api_searches/min_fav_recipes' => 'api_searches#min_fav_recipes'
      post 'api_searches/favorite_recipes' => 'api_searches#update_favorites'

    end
  end

  #GROCERY_INGREDIENT_JOIN
  get 'grocery_ingredient_joins' => 'grocery_ingredient_joins#index'
  post 'grocery_ingredient_joins' => 'grocery_ingredient_joins#join'
  get 'grocery_ingredient_joins/edit' => 'grocery_ingredient_joins#edit'

end
