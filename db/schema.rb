# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150304193915) do

  create_table "admins", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "admins", ["email"], name: "index_admins_on_email", unique: true
  add_index "admins", ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true

  create_table "programmes", force: :cascade do |t|
    t.string   "title"
    t.text     "notes"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "programmes", ["user_id"], name: "index_programmes_on_user_id"

  create_table "programmes_resources", force: :cascade do |t|
    t.integer "resource_id"
    t.integer "programme_id"
  end

  add_index "programmes_resources", ["programme_id"], name: "index_programmes_resources_on_programme_id"
  add_index "programmes_resources", ["resource_id"], name: "index_programmes_resources_on_resource_id"

  create_table "programmes_scriptures", force: :cascade do |t|
    t.integer "scripture_id"
    t.integer "programme_id"
    t.integer "programmeOrder"
  end

  add_index "programmes_scriptures", ["programme_id"], name: "index_programmes_scriptures_on_programme_id"
  add_index "programmes_scriptures", ["scripture_id"], name: "index_programmes_scriptures_on_scripture_id"

  create_table "programmes_songs", force: :cascade do |t|
    t.integer "programme_id"
    t.integer "song_id"
    t.integer "programmeOrder"
  end

  add_index "programmes_songs", ["programme_id"], name: "index_programmes_songs_on_programme_id"
  add_index "programmes_songs", ["song_id"], name: "index_programmes_songs_on_song_id"

  create_table "resources", force: :cascade do |t|
    t.string   "title"
    t.text     "location"
    t.string   "resourceType"
    t.string   "attribution"
    t.integer  "user_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "resources", ["user_id"], name: "index_resources_on_user_id"

  create_table "scriptures", force: :cascade do |t|
    t.string   "title"
    t.text     "content"
    t.string   "author"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "font_size"
    t.string   "font_family"
    t.string   "text_color"
    t.string   "bg_color"
    t.integer  "bg_opacity"
    t.integer  "resource_id"
  end

  add_index "scriptures", ["user_id"], name: "index_scriptures_on_user_id"

  create_table "songs", force: :cascade do |t|
    t.string   "title"
    t.text     "content"
    t.string   "license"
    t.string   "author"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "font_size"
    t.string   "font_family"
    t.string   "text_color"
    t.string   "bg_color"
    t.integer  "bg_opacity"
    t.integer  "resource_id"
  end

  add_index "songs", ["user_id"], name: "index_songs_on_user_id"

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

end
