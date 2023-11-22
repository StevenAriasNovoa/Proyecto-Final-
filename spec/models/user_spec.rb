require 'rails_helper'

RSpec.describe User, type: :model do

  it { should validate_presence_of(:name) }
  it { should validate_length_of(:name).is_at_most(255) }
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email).case_insensitive }
  it { should allow_value('user@example.com').for(:email) }
  it { should_not allow_value('user@').for(:email) }
  it { should validate_numericality_of(:age).only_integer.is_greater_than_or_equal_to(0).allow_nil }
  it { should validate_presence_of(:encrypted_password) }
  it { should validate_length_of(:encrypted_password).is_at_least(6) }

end

