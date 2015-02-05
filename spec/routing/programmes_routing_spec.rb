require "rails_helper"

RSpec.describe ProgrammesController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/programmes").to route_to("programmes#index")
    end

    it "routes to #new" do
      expect(:get => "/programmes/new").to route_to("programmes#new")
    end

    it "routes to #show" do
      expect(:get => "/programmes/1").to route_to("programmes#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/programmes/1/edit").to route_to("programmes#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/programmes").to route_to("programmes#create")
    end

    it "routes to #update" do
      expect(:put => "/programmes/1").to route_to("programmes#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/programmes/1").to route_to("programmes#destroy", :id => "1")
    end

  end
end
