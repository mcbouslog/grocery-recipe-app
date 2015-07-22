class ChangeScoreFactorofGroceries < ActiveRecord::Migration
  def change
    change_table :groceries do |t|
      t.change :score_factor, :decimal, precision: 2, scale: 2
    end
  end
end
