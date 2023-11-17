class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  rolify

  devise :database_authenticatable, :registerable,
        :recoverable, :validatable,
        :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

end
