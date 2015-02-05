require 'rails_helper'

RSpec.describe "programmes/show", type: :view do
  before(:each) do
    @programme = assign(:programme, Programme.create!(
      :title => "Title",
      :notes => "MyText"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Title/)
    expect(rendered).to match(/MyText/)
  end
end
