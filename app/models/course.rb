class Course < ApplicationRecord

    belongs_to :institution
    has_many :branches
    has_many :user_courses
    has_many :users, through: :user_courses
    has_many :category_courses
    has_many :categories, through: :category_courses

end
