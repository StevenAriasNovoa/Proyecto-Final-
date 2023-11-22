class Course < ApplicationRecord

    belongs_to :institution
    has_many :branches
    has_many :user_courses
    has_many :users, through: :user_courses
    has_many :category_courses
    has_many :categories, through: :category_courses

    validates_presence_of :name, length: { maximum: 355 }
    validates_format_of :name, with: /[A-Z][a-z]+/
    validates :requirement, presence: true
    validates :description, presence: true, length: { maximum: 455 }
    validates :registration_day, presence: true
    validates :favorite, inclusion: { in: [true, false] }

end
