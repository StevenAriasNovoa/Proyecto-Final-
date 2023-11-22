require 'rails_helper'

RSpec.describe Institution, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_length_of(:name).is_at_most(255) }
  it { should validate_presence_of(:insti_type) }
  it { should validate_presence_of(:insti_type).is_at_most(255) }
end
