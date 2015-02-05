json.array!(@scriptures) do |scripture|
  json.extract! scripture, :id, :title, :content, :author, :user_id
  json.url scripture_url(scripture, format: :json)
end
