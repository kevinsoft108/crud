FactoryBot.define do
  factory :issue do
    project
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.sentences }
    assignee { Faker::Name.name }
    status { Issue.statuses.keys[Faker::Number.rand(4)] }
  end
end
