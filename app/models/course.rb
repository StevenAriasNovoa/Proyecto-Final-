class Course < ApplicationRecord

    belongs_to :institution
    has_many :branches
    has_many :user_courses
    has_many :users, through: :user_courses
    has_many :category_courses
    has_many :categories, through: :category_courses


    validates_presence_of :requirement, :description, :registration_day, :name
    validates_length_of :name, maximum: 100
    validates_length_of :requirement, maximum: 100
    validates_format_of :name, :requirement, :description, with: /[A-Z][a-z]+/
    validates_length_of :description, maximum: 355
    validates_inclusion_of :favorite, in: [true, false]

end  
