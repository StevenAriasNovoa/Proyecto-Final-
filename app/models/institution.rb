class Institution < ApplicationRecord

    has_many :courses

    validates :name, presence: true
    validates :insti_type, presence: true

end
