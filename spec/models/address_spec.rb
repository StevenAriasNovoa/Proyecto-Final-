require 'rails_helper'

RSpec.describe Address, type: :model do

  let(:address) { FactoryBot.build(:address) }

  describe "Validations" do
    it "is valid with valid attributes" do
      expect(address).to be_valid
    end 

    it "is not valid without a province" do
      address.province = nil
      expect(address).to_not be_valid
    end

    it "is not valid without a canton" do
      address.canton = nil
      expect(address).to_not be_valid
    end

    it "is not valid without a district" do
      address.district = nil
      expect(address).to_not be_valid
    end

    it "is not valid without a neighborhood" do
      address.neighborhood = nil
      expect(address).to_not be_valid
    end
  end
end
