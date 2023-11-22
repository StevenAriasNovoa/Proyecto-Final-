class Address < ApplicationRecord

  has_many :branches

  validates_presence_of :province
  validates_length_of :province, maximum: 50

  validates_presence_of :canton
  validates_length_of :canton, maximum: 50

  validates_presence_of :district
  validates_length_of :district, maximum: 50

  validates_presence_of :neighborhood
  validates_length_of :neighborhood, maximum: 50

end
