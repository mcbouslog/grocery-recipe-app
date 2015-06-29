class UserGrocery < ActiveRecord::Base
  belongs_to :user
  belongs_to :grocery
  
end
