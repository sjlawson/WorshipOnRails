require 'rails_helper'

RSpec.describe "programmes/new", type: :view do
  before(:each) do
    assign(:programme, Programme.new(
      :title => "MyString",
      :notes => "MyText"
    ))
  end

  it "renders new programme form" do
    render

    assert_select "form[action=?][method=?]", programmes_path, "post" do

      assert_select "input#programme_title[name=?]", "programme[title]"

      assert_select "textarea#programme_notes[name=?]", "programme[notes]"
    end
  end
end
