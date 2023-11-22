class Categorie  < ApplicationRecord

    has_many :categories_courses
    has_many :courses, through: :category_courses

    validates :name, presence: true, length: { maximum: 255 }

end
