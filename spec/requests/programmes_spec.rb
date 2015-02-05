require 'rails_helper'

RSpec.describe "Programmes", type: :request do
  describe "GET /programmes" do
    it "works! (now write some real specs)" do
      get programmes_path
      expect(response).to have_http_status(200)
    end
  end
end
