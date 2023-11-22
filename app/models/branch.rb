class Branch < ApplicationRecord
    
    belongs_to :course
    belongs_to :address

    validates_presence_of :name, length: { maximum: 355 }

end
