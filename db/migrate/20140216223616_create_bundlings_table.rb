class CreateBundlingsTable < ActiveRecord::Migration
  def change
    create_table :bundlings do |t|

      t.integer :activity_id
      t.integer :outing_id
    end
  end
end
