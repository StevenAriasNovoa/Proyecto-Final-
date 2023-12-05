class AddInstitutionToCourses < ActiveRecord::Migration[7.0]

  def change
    add_reference(:courses, :institution, foreign_key: true, null: false)
  end
  
end
