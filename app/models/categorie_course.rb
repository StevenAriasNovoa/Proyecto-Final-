class CategoryCourse < ApplicationRecord

    belongs_to :categorie
    belongs_to :course

    validates_presence_of :course_id :categorie_id

end