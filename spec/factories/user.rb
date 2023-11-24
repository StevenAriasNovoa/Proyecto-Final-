FactoryBot.define do 
    factory :user do
        name { "Nombre de ejemplo" }
        age { 25 }
        email { "example@example.com" }
        encrypted_password { Devise.friendly_token }
        reset_password_token { nil }
        reset_password_sent_at { nil }
        remember_created_at { nil }
    end 
end  