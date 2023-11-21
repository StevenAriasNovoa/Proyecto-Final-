class Categorie < ApplicationRecord

    has_many :categories_courses
    has_many :courses, through: :category_courses

end
