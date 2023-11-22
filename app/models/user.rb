class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  rolify

  devise :database_authenticatable, :registerable,
        :recoverable, :validatable,
        :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  validates :name, presence: true, length: { maximum: 255 }
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :age, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, allow_nil: true
  validates :encrypted_password, presence: true

end
