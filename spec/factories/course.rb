FactoryBot.define do
    factory :course do
      name { 'Example Course' }
      requirement { 'Example Requirement' }
      description { 'Lorem ipsum dolor sit amet' }
      registration_day { Date.today }
      favorite { false }
      association :institution
    end
  end
  