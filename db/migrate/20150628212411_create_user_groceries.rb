class CreateUserGroceries < ActiveRecord::Migration
  def change
    create_table :user_groceries do |t|
      t.integer :user_id
      t.integer :grocery_id
      t.boolean :stock
      t.boolean :shopping_list

      t.timestamps null: false
    end
  end
end
