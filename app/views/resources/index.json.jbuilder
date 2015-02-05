json.array!(@resources) do |resource|
  json.extract! resource, :id, :title, :location, :resourceType, :attribution, :user_id
  json.url resource_url(resource, format: :json)
end
