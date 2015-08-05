Rails.application.routes.draw do

  root to: 'groceries#index'
  devise_for :users

  #GROCERIES
  get 'groceries' => 'groceries#index'
  get 'groceries/shop_list' => 'groceries#show'


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

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
