class CreateOutings < ActiveRecord::Migration
  def change
    create_table :outings do |t|
      t.string :name, default: "date"

      t.timestamps
    end
  end
end
