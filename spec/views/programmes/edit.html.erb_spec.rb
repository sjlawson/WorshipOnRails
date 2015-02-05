require 'rails_helper'

RSpec.describe "programmes/edit", type: :view do
  before(:each) do
    @programme = assign(:programme, Programme.create!(
      :title => "MyString",
      :notes => "MyText"
    ))
  end

  it "renders the edit programme form" do
    render

    assert_select "form[action=?][method=?]", programme_path(@programme), "post" do

      assert_select "input#programme_title[name=?]", "programme[title]"

      assert_select "textarea#programme_notes[name=?]", "programme[notes]"
    end
  end
end
