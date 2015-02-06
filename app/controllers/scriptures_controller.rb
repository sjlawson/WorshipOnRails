class ScripturesController < ApplicationController
  before_filter :require_login
  before_action :set_scripture, only: [:show, :edit, :update, :destroy]

  # GET /scriptures
  # GET /scriptures.json
  def index
    @scriptures = Scripture.all
  end

  # GET /scriptures/1
  # GET /scriptures/1.json
  def show
  end

  # GET /scriptures/new
  def new
    @scripture = Scripture.new
  end

  # GET /scriptures/1/edit
  def edit
  end

  # POST /scriptures
  # POST /scriptures.json
  def create
    @scripture = Scripture.new(scripture_params)

    respond_to do |format|
      if @scripture.save
        format.html { redirect_to @scripture, notice: 'Scripture was successfully created.' }
        format.json { render :show, status: :created, location: @scripture }
      else
        format.html { render :new }
        format.json { render json: @scripture.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /scriptures/1
  # PATCH/PUT /scriptures/1.json
  def update
    respond_to do |format|
      if @scripture.update(scripture_params)
        format.html { redirect_to @scripture, notice: 'Scripture was successfully updated.' }
        format.json { render :show, status: :ok, location: @scripture }
      else
        format.html { render :edit }
        format.json { render json: @scripture.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /scriptures/1
  # DELETE /scriptures/1.json
  def destroy
    @scripture.destroy
    respond_to do |format|
      format.html { redirect_to scriptures_url, notice: 'Scripture was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_scripture
      @scripture = Scripture.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def scripture_params
      params.require(:scripture).permit(:title, :content, :author, :user_id)
    end
end
