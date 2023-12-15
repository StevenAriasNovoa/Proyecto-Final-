
FactoryBot.define do 
    factory :user do
        name { "Nombre de ejemplo" }
        birthdate { Date.new(1990, 1, 1) }
        sequence(:email) { |n| "user#{n}@example.com" }
        password { 'password123' }
        encrypted_password { Devise.friendly_token }
        reset_password_token { nil }
        reset_password_sent_at { nil }
        remember_created_at { nil }
    end 
end  