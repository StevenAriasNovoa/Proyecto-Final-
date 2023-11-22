require 'rails_helper'

RSpec.describe CategoriesCourse, type: :model do

describe 'validations' do
    it { should validate_presence_of(:course_id) }
    it { should validate_presence_of(:categories_id) }
    end

end
