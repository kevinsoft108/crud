require 'rails_helper'

RSpec.describe 'homes/index' do
  it 'displays root' do
    render

    expect(rendered).to match /root/
  end
end