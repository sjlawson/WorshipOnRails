class AdminController < ApplicationController
  before_action :authenticate_admin!

  def home
  end

  # GET /admin/new_user
  def new_user
    @new_user = User.new
  end

  # POST /users
  # POST /users.json
  def create_user
    @new_user = User.new(user_params)
    if @new_user.save
      #success
      redirect_to @new_user, notice: 'User was successfully created.'
      # format.json { render :show, status: :created, location: @user }
    else
      #error
      render @new_user.errors
      # format.json { render json: @user.errors, status: :unprocessable_entity }
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

end
