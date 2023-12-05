class Address < ApplicationRecord

    has_many :branches

    validates :province, :canton, :district, :neighborhood, presence: true, length: { maximum: 50 }

end
