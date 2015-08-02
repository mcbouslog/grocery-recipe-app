Rails.application.routes.draw do

  root to: 'groceries#index'
  devise_for :users

  #GROCERIES
  get 'groceries' => 'groceries#index'
  get 'groceries/:id' => 'groceries#show'

  #GROCERY_INGREDIENT_JOIN
  get 'grocery_ingredient_joins' => 'grocery_ingredient_joins#index'
  post 'grocery_ingredient_joins' => 'grocery_ingredient_joins#join'
  get 'grocery_ingredient_joins/edit' => 'grocery_ingredient_joins#edit'

  #RECIPES
  get 'recipes' => 'recipes#index'
  get 'recipes/:id' => 'recipes#show'

  #APIs
  namespace :api do
    namespace :v1 do

      get 'api_groceries' => 'api_groceries#index'
      post 'api_groceries' => 'api_groceries#update'
      
      get 'api_ingredients' => 'api_ingredients#index'
      post 'api_ingredients' => 'api_ingredients#update'      
      get 'api_ingredients/user_ingredients' =>'api_ingredients#user_ingredients'
      get 'api_ingredients/search' => 'api_ingredients#search'
      get 'api_ingredients/join' => 'api_ingredients#join'
      
      post 'api_searches' => 'api_searches#index'
      
    end
  end

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
