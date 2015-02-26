class AdminController < ApplicationController
  before_action :authenticate_admin!
  before_action :set_admin, only: [:show, :edit, :update]


  def home
  end

  # GET /admin/new_user
  def new_user
    @new_user = User.new
  end

  def edit
  end

  # PATCH/PUT /admin/1
  def update
    respond_to do |format|
      if @admin_user.update(admin_params)
        format.html { redirect_to :admin_home, notice: 'Admin User was successfully updated.' }
      else
        format.html { render :edit }
      end
    end
  end

  # POST /users
  def create_user
    @new_user = User.new(user_params)
    if @new_user.save
      #success
      redirect_to @new_user, notice: 'User was successfully created.'
    else
      #error
      render @new_user.errors
    end
  end

  private

  def set_admin
    @admin_user = current_admin
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def admin_params
    params.require(:admin).permit(:email, :password)
  end

end
