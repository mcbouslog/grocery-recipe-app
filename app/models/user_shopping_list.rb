class UserShoppingList < ActiveRecord::Base
  belongs_to :user
  belongs_to :grocery
  belongs_to :ingredient

end
