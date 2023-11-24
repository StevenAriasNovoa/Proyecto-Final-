class CategoryCourses < ApplicationRecord

    belongs_to :category
    belongs_to :course

    validates_presence_of :course_id :categories_id

end