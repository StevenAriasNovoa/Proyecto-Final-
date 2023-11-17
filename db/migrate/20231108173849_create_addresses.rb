class CreateAddresses < ActiveRecord::Migration[7.0]
  def change
    create_table :addresses do |t|
      t.string :province 
      t.string :canton
      t.string :district
      t.string :neighborhood

      t.timestamps
    end
  end
end
