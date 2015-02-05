json.array!(@songs) do |song|
  json.extract! song, :id, :title, :content, :license, :author, :user_id
  json.url song_url(song, format: :json)
end
