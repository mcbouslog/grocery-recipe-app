class User < ActiveRecord::Base
  has_many :user_groceries
  has_many :groceries, through: :user_groceries

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
