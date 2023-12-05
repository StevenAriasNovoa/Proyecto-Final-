class Category  < ApplicationRecord

    has_many :category_courses
    has_many :courses, through: :category_courses

    validates_presence_of :name
    validates_length_of :name, maximum: 50

end
