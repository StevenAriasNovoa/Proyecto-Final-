require 'rails_helper'

RSpec.describe Course, type: :model do
  
  it { should validate_presence_of(:name) }
  it { should validate_length_of(:name).is_at_most(255) }
  it { should validate_presence_of(:requirement) }
  it { should validate_length_of(:requirement).is_at_most(255) }
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:supcription_date) }
  it { should validate_inclusion_of(:favorite).in_array([true, false]) }

end
