class ProgrammesController < ApplicationController

  before_filter :require_login
  before_action :set_programme, only: [:show, :edit, :update, :destroy]

  # GET /programmes
  # GET /programmes.json
  def index
    @programmes = Programme.where(:user_id => current_user.id)
  end

  # GET /programmes/1
  # GET /programmes/1.json
  def show
    @programmeSongs = @programme.programmesSongs.order( :programmeOrder )
    @programmeScriptures = @programme.programmesScriptures.order( :programmeOrder )

    @fontList = Array.new(['American Typewriter', 'Courier New', 'Courier', 'Monaco', 'Arial Rounded MT Bold', 'Helvetica', 'Arial', 'sans-serif', 'Baskerville', 'Georgia', 'Garamond', 'Times New Roman', 'Times', 'serif', 'Book Antiqua', 'Bookman Old Style', 'Brush Script MT', 'Comic Sans', 'Chalkboard', 'Didot', 'Futura', 'Impact', 'Gill Sans', 'Lucida Grande', 'Lucida Sans Unicode', 'Verdana', 'Helvetica Neue', 'Hoefler Text', 'Lucida Grande', 'Marker Felt', 'Myriad', 'Optima', 'Palatino', 'Cochin', 'Goudy Old Style']);

  end

  # GET /programmes/new
  def new
    if !user_signed_in?
      redirect_to home_index_path()
    end
    @programme = Programme.new
    @userSongs = Song.where(:user_id => current_user.id)
    @userScriptures = Scripture.where(:user_id => current_user.id)
    @userResources = Resource.where(:user_id => current_user.id)
  end

  # GET /programmes/1/edit
  def edit
    @userSongs = Song.where(:user_id => current_user.id)
    @userScriptures = Scripture.where(:user_id => current_user.id)
    @userResources = Resource.where(:user_id => current_user.id)

    @programmeSongs = @programme.programmesSongs

  end

  # POST /programmes
  # POST /programmes.json
  def create
    @programme = Programme.new(programme_params)

    respond_to do |format|
      if @programme.save
        format.html { redirect_to @programme, notice: 'Programme was successfully created.' }
        format.json { render :show, status: :created, location: @programme }
      else
        format.html { render :new }
        format.json { render json: @programme.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /programmes/1
  # PATCH/PUT /programmes/1.json
  def update
    respond_to do |format|
      if @programme.update(programme_params)
        format.html { redirect_to @programme, notice: 'Programme was successfully updated.' }
        format.json { render :show, status: :ok, location: @programme }
      else
        format.html { render :edit }
        format.json { render json: @programme.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /programmes/1
  # DELETE /programmes/1.json
  def destroy
    @programme.destroy
    respond_to do |format|
      format.html { redirect_to programmes_url, notice: 'Programme was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_programme
    @programme = Programme.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def programme_params
    params.require(:programme).permit( :title, :notes, :user_id, :scripture_ids => [], :resource_ids => [], :song_ids => [],
                                       programmesSongs_attributes: [:id, :song_id, :programme_id, :programmeOrder],
                                       programmesScriptures_attributes: [:id, :scripture_id, :programme_id, :programmeOrder]
                                       )
  end

end
