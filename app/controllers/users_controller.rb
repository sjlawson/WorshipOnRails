class UsersController < ApplicationController
  before_filter :require_login
  before_action :authenticate_admin!, only: [:new, :create, :destroy, :index]
  before_action :set_user, only: [:show, :edit, :update, :destroy]


  def show
  end

  # GET /users/1/edit
  def edit
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        # format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        # format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def new
  end

  def create
  end

  def destroy
  end

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    if :authenticate_admin!
      @user = User.find(params[:id])
    else
      @user = current_user
    end
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end

end
