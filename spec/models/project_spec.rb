require 'rails_helper'

RSpec.describe Project, type: :model do
  describe 'associations' do
    it { should have_many(:issues).dependent(:destroy) }
  end

  describe 'validations' do
    it { should validate_presence_of(:title) }
  end
end
