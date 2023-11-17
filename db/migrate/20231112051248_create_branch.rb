class CreateBranch < ActiveRecord::Migration[7.0]
  def change
    create_table :branches do |t|
      t.references :address, null: false, foreign_key: true
      t.references :course, null: false, foreign_key: true
      t.string :name
      
      t.timestamps
    end
  end
end
