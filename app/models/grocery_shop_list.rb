class GroceryShopList < ActiveRecord::Base
  belongs_to :user
  belongs_to :grocery
end
