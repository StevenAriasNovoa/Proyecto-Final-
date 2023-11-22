require 'rails_helper'

RSpec.describe Address, type: :model do

  it { should validates_presence_of(:province) }
  it { should validates_length_of(:province).is_at_most(50) }
  it { should validates_presence_of(:canton) }
  it { should validates_length_of(:canton).is_at_most(50) }
  it { should validates_presence_of(:district) }
  it { should validates_length_of(:district).is_at_most(50) }
  it { should validates_presence_of(:neighborhood) }
  it { should validates_length_of(:neighborhood).is_at_most(50) }

end
