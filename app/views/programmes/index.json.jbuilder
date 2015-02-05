json.array!(@programmes) do |programme|
  json.extract! programme, :id, :title, :notes
  json.url programme_url(programme, format: :json)
end
