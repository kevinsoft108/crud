FactoryBot.define do
  factory :project do
    title { Faker::Lorem.sentence }
  end
end
