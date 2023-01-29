FactoryBot.define do
  factory :comment do
    user
    commentable { issue }
    body { Faker::Lorem.sentences }
  end
end
