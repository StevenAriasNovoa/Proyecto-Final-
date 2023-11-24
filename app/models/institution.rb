class Institution < ApplicationRecord

    has_many :courses

    validates_presence_of :name, :insti_type
    validates_length_of :name, maximum: 50
    validates_length_of :insti_type, maximum: 50

end
