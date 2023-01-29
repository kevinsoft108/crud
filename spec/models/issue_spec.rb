require 'rails_helper'

RSpec.describe Issue, type: :model do
  describe 'associations' do
    it { should belong_to(:project) }
    it { should have_many(:comments).dependent(:destroy) }
  end

  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:assignee) }
  end

  describe 'enum' do
    it { should define_enum_for(:status).with_values('Active': 1, 'On Hold': 2, 'Resolved': 3, 'Closed': 4) }
  end
end
