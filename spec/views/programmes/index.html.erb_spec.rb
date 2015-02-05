require 'rails_helper'

RSpec.describe "programmes/index", type: :view do
  before(:each) do
    assign(:programmes, [
      Programme.create!(
        :title => "Title",
        :notes => "MyText"
      ),
      Programme.create!(
        :title => "Title",
        :notes => "MyText"
      )
    ])
  end

  it "renders a list of programmes" do
    render
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
