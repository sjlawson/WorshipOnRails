var initComplete = false;
// set defaults
var defaultFontSize = '16';
var defaultFont = "Arial";
var fontColor = '#FFFFFF';
var vidBGColor = '#000000';

var myNewWindow;
var currentSlide;
var lyricElement;
var liveViewPort;
var videoElement;
var bgUrl;
var bgType;
var hostWithPort;

var currentContentObject = new contentObject("",null,null,defaultFontSize,defaultFont,fontColor,vidBGColor,100);

/**
 * Object to hold information about content being displayed
 *
 * @params contentType, contentId, bgResourceId, fontSize, fontFamily, textColor, bgColor, bgOpacity
*/
function contentObject(contentType, contentId, bgResourceId, fontSize, fontFamily, textColor, bgColor, bgOpacity)
{
    this.contentType = contentType;
    this.contentId = contentId;
    this.bgResourceId = bgResourceId;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.textColor = textColor;
    this.bgColor = bgColor;
    this.bgOpacity = bgOpacity;
}

/**
 * make state of contentObject persistent
 */
function saveCurrentContentObject()
{
    var patchObject = {
        font_size: currentContentObject.fontSize,
        font_family: currentContentObject.fontFamily,
        text_color: currentContentObject.textColor,
        bg_color: currentContentObject.bgColor,
        bg_opacity: currentContentObject.bgOpacity,
        resource_id: currentContentObject.bgResourceId
    };

    $.ajax({
        type: "PUT",
        url: '/' + currentContentObject.contentType + '/' + currentContentObject.contentId + '.json',
        data: JSON.stringify(patchObject),
        contentType: 'application/json',
        dataType: 'json',
        success: function() {
            $(".notice").html( currentContentObject.contentType + ' property saved: ');
        },
        failure: function() {
            $(".alert").html(currentContentObject.contentType + ' property save error: ');
        }
    });

}

/**
 * Close external window
 */
function closeProjector()
{
    myNewWindow.close();
    myNewWindow = null;
}

/**
 * Open external window
 */
function initProjectorWindow()
{
    var NewWindow = window.open("about:blank", '_blank','width=800,height=600');

    return NewWindow;
}

/**
 * If window is has not already been launched, open new window and add base elements
 */
function loadProjectorWindow()
{
    if(myNewWindow == undefined || myNewWindow == null) {
        myNewWindow = initProjectorWindow();
        myNewWindow.onbeforeunload = function(){ myNewWindow = null; }
        myNewWindow.document.body.style.backgroundColor="black";

        var csslink = document.createElement("link");
        csslink.href = hostWithPort + "/assets/vidwinstyles.css";
        csslink.type = "text/css";
        csslink.rel = "stylesheet";

        var lyric_block_container = myNewWindow.document.createElement("div");
        lyric_block_container.setAttribute("id","proj_content_container");

        var lyric_block = myNewWindow.document.createElement("div");
        lyric_block.setAttribute("id","proj_content_block");
        lyric_block.innerHTML = currentSlide != undefined ? currentSlide : '' ;

        lyric_block_container.appendChild(lyric_block);

        var vidContainer = myNewWindow.document.createElement("div");
        vidContainer.setAttribute("id","vidContainer");

        $(myNewWindow.document).ready(setTimeout(function() {
            myNewWindow.document.getElementsByTagName("head")[0].appendChild(csslink);
            myNewWindow.document.body.appendChild(vidContainer);
            myNewWindow.document.body.appendChild(lyric_block_container);
            lyricElement = myNewWindow.document.getElementById("proj_content_block");
        }, 1000) );
    }
}

/**
 * Get resource object for use in background
 * On success, pass function to setMediaBackground to make it live
 */
function setBackground()
{
    if(currentContentObject.bgResourceId) {
        $.get("/resources/" + currentContentObject.bgResourceId + ".json", function( resourceObj) {
            bgUrl = resourceObj.location;
            bgType = resourceObj.resourceType;
            setMediaBackground();
        } );
    } else {
        bgType = '';
        setMediaBackground();
    }
}

/**
 * Places current background resource on the live window
 */
function setMediaBackground()
{
    switch (bgType) {
        case 'video/mp4':
        if(myNewWindow != null) {
            videoElement = myNewWindow.document.createElement("video");
            videoElement.setAttribute("id","proj_video_background");
            videoElement.setAttribute("preload","auto");
            alert(currentContentObject.contentType);
            if(currentContentObject.contentType == 'resources') {
                // featured video item
                videoElement.setAttribute("autoplay","false");
                videoElement.setAttribute("controls",true);
            } else {
                videoElement.setAttribute("autoplay","true");
                videoElement.setAttribute("loop","loop");
                videoElement.setAttribute("muted","muted");
                videoElement.setAttribute("volume","0");
            }
            var vidSrc = myNewWindow.document.createElement("source");
            vidSrc.setAttribute("src", bgUrl);
            vidSrc.setAttribute("type",bgType);
            vidSrc.setAttribute("id","video-source-player");

            videoElement.appendChild(vidSrc);
            vidContainer = myNewWindow.document.getElementById('vidContainer');
            vidContainer.appendChild(videoElement);
        }
        /* ToDo: generate video thumb */
        $('#cloneWinVidContainer')
            .append("<video id='clone_proj_video_background' muted='muted' volume='0'></video>");
        $('#clone_proj_video_background')
            .append("<source id='clone-video-source-player'  type='" + bgType + "' src='" + bgUrl  + "' />" );

        break;
        case 'jpg':
        case 'gif':
        case 'png':
        case 'bmp':
        case 'tif':
        if(myNewWindow != null) {

            videoElement = myNewWindow.document.getElementById("proj_video_background");
            // if(videoElement != undefined) {
            if($(videoElement)) {
                $(videoElement).remove(); // .parentNode.removeChild(videoElement);
            }

            $(myNewWindow.document.getElementById("vidContainer")).css('background-image', 'url(' + bgUrl + ')')
                .css('background-size', '100vw 100vh')
                .css('background-repeat','no-repeat')
                .css('background-origin','border-box');
        }

        if($('#clone_proj_video_background')) {
            $('#clone_proj_video_background').remove();
        }

        $('#cloneWinVidContainer').css('background-image', 'url(' + bgUrl + ')')
            .css('background-size', '300px 200px')
            .css('background-repeat','no-repeat');

        break;
        default:
        if(myNewWindow != null) {
            videoElement = myNewWindow.document.getElementById("proj_video_background");
            if(videoElement != undefined) {
                videoElement.parentNode.removeChild(videoElement);
            }
            $(myNewWindow.document.getElementById("vidContainer")).css('background-image', 'none');
            $(myNewWindow.document.body).css('background-image', 'none');
        }
        if($('#clone_proj_video_background')) {
            $('#clone_proj_video_background').remove();
        }

        $('#cloneWinVidContainer').css('background-image', 'none');
    }
}

/**
 * Set opacity of background media element
 */
function setBGOpacity()
{
    var opacity = currentContentObject.bgOpacity / 100;
    if(myNewWindow != null) {
        $(myNewWindow.document.getElementById("vidContainer")).css('opacity', opacity );
    }

    $('#cloneWinVidContainer').css('opacity', opacity);
    currentContentObject.bgOpacity = opacity * 100;
    $('#projector_opacity').val(currentContentObject.bgOpacity);
}

/**
 * When a content item has been selected, load into the live slide-chooser column
 */
function loadContentItem()
{
    var type = currentContentObject.contentType;
    var id = currentContentObject.contentId;
    var slideData;

    if(type == 'resources') {
        $.get("/" + type + "/" + id + ".json", function( data ) {
            currentContentObject.fontSize = '';
            currentContentObject.fontFamily = '';
            currentContentObject.textColor = '';
            currentContentObject.bgOpacity = 100;

            alert( data.location );
        });
    } else {
        $.get("/" + type + "/" + id + ".json", function( data ) {
            var slideContent = data.content.replace(/\[(.*?)\]/g,
                                                    "</div><label class='slide_label'>$1</label> \
<div class='slide_content'><p>");

            slideContent = "<div>" + slideContent;
            slideContent = slideContent.replace(/(?:\r\n|\r|\n)/g, '</p><p class="lyric-line">');
            slideContent += "</p></div>";
            slideContent = slideContent.replace("<p></p>",'');
            // defaultFontSize,defaultFont,fontColor,vidBGColor,100

            currentContentObject.fontSize = data.font_size ? data.font_size : defaultFontSize;
            currentContentObject.fontFamily = data.font_family ? data.font_family : defaultFont;
            currentContentObject.textColor = data.text_color ? data.text_color : fontColor;
            currentContentObject.bgResourceId = data.resource_id ? data.resource_id : null;
            currentContentObject.bgOpacity = data.bg_opacity ? data.bg_opacity : 100;
            currentContentObject.bgColor = data.bg_color ? data.bg_color : vidBGColor;

            $( "#slides" ).html( slideContent );
            $('.slide_content').click(function() { change_content(this); });

        });

        $("#slides div:nth-child(1)").css("backgroundColor","#A2D3A2");
    }
}

/**
 * After loading new content (song, scripture, video), set persistent style values in controls
 */
function setControlsToCurrentContentObject()
{
    $('#set_font_family').val(currentContentObject.fontFamily);
    $('#set_font_size').val(currentContentObject.fontSize);
    $('#font_color').val(currentContentObject.textColor);
    $('#projector_bg_color').val(currentContentObject.bgColor);
    $('#projector_opacity').val(currentContentObject.bgOpacity);

    $("#fontColorPicker div.wColorPicker-button .wColorPicker-button-color").css('background-color', currentContentObject.textColor);
    $("#bgPicker div.wColorPicker-button .wColorPicker-button-color").css('background-color', currentContentObject.bgColor);
}

/**
 * Apply current contentObject parameters to live view window and to clone element
 */
function setStylesToCurrentContentObject()
{
    setLiveFont();
    setLiveFontSize();
    setFontColor();
    setBGColor();
    setBGOpacity();
    setBackground();
}

/**
 * Place a featured media element in the projection and clone window
 */
function display_featured_media(content_element)
{
    if(videoElement != undefined) {
        videoElement.style.display = "block";
        videoElement.remove();
    }

    blankScreen();
    unselect_slide_backgrounds();
    setBackground();
}

/**
 * Set all slide backgrounds to default bg colour (white)
 */
function unselect_slide_backgrounds()
{
    var slideChildren = document.getElementById("slides").childNodes;
    for (var i = 0; i < slideChildren.length; i++) {
        var childSlide = slideChildren[i];

        if(childSlide.nodeType == 1)
            childSlide.style.backgroundColor="white";
    }
}

/**
 * When a different slide is selected clicked, move its content to live
 */
function change_content(content_element)
{
    if(content_element.nodeName == 'P') {
        content_element = $(content_element).parent();
    } else {
        content_element = $(content_element);
    }

    var content = (content_element != undefined ) ? $(content_element).html() : "";

    if(videoElement != undefined) {
        videoElement.style.display = "block";
        videoElement.play();
    }
    if(myNewWindow != null) {
        lyricElement.innerHTML = content;
    }
    $('#clone_lyric_block').html(content);

    setStylesToCurrentContentObject();
    setControlsToCurrentContentObject();

    unselect_slide_backgrounds()

    this.currentSlide = content;
    $(content_element).css('backgroundColor','#A2D3A2');

}

/**
 * Blank content on live window/clone -- leaves background image.
 */
function blankScreen()
{
    if(myNewWindow != undefined) {
        lyricElement.innerHTML = "";
        liveViewPort.innerHTML = "";
        if(videoElement != undefined) {
            videoElement.pause();
            videoElement.style.display = "none";
        }
    }

    $('#clone_lyric_block').html('');
}

/**
 * Assigns textColor from currentContentObject to text elements color in live window and clone element
 */
function setFontColor()
{
    if(myNewWindow != null) {
        $(lyricElement).css('color', currentContentObject.textColor );
    }

    $('#clone_lyric_block .lyric-line').css('color', currentContentObject.textColor);
}

/**
 * Assigns bgColor from currentContentObject to body element color in live window and clone element background
 */
function setBGColor()
{
    if(myNewWindow != null) {
        $(myNewWindow.document.body).css('background-color', currentContentObject.bgColor );
    }

    $('#cloneWindowBody').css('background-color', currentContentObject.bgColor);
}

/**
 * Assigns fontSize from currentContentObject to text elements in live window and clone element background
 */
function setLiveFontSize() {
    $('#clone_lyric_block .lyric-line').css('font-size', Math.ceil( currentContentObject.fontSize ));
    if(myNewWindow != null) {
        $(lyricElement)
            .css('font-size', Math.ceil( currentContentObject.fontSize * 2.5 ));
    }
}

/**
 * Assigns fontFamily from currentContentObject to text elements in live window and clone element background
 */
function setLiveFont() {
    $('#clone_lyric_block .lyric-line').css('font-family', currentContentObject.fontFamily);
    if(myNewWindow != null) {
        $(lyricElement)
            .css('font-family', currentContentObject.fontFamily);
    }
}

/**
 * Setup element events and init states
 */
function initElements()
{
    $('.slide_content').on('click', function(event) {
        change_content(event.target);
    });

    $('.resource_scheduler').on('click', function(event) {
        currentContentObject.contentType = 'resources';
        currentContentObject.contentID = $(event.target).attr('rel');
        currentContentObject.bgResourceId = $(event.target).attr('rel');
        display_featured_media();
    } );

    $('.song_scheduler').on('click', function(event) {
        currentContentObject.contentType = 'songs';
        currentContentObject.contentId = $(event.target).attr('rel');
        loadContentItem();
    });

    $('.scripture_scheduler').on('click', function(event) {
        currentContentObject.contentType = 'scriptures';
        currentContentObject.contentId = $(event.target).attr('rel');
        loadContentItem();
    });

    $('#loadProjectorWindow').on('click', function() {
        loadProjectorWindow();
    });

    $('#closeProjectorWindow').on('click', function() {
        closeProjector();
    });

    $('#goToBlank').on('click', function() {
        blankScreen();
    });

    $('#fontColorPicker').wColorPicker({
        mode: 'click',
        color: currentContentObject.textColor,
        onSelect: function(color){
            $("input#font_color").val(color);
            $('#fontColorPicker').css('background', color).val(color);
        }
    });

    $('#bgPicker').wColorPicker({
        mode: 'click',
        color: currentContentObject.bgColor,
        onSelect: function(color){
            $("input#projector_bg_color").val(color);
            $('#bgPicker').css('background', color).val(color);
        }
    });

    $('#set_projector_font_color').on('click', function() {
        currentContentObject.textColor = $('#font_color').val();
        saveCurrentContentObject();
        setFontColor();
    });

    $('#font_color').val(currentContentObject.textColor);
    setFontColor();

    $('#set_projector_bg_color').on('click', function() {
        currentContentObject.bgColor = $('#projector_bg_color').val();
        setBGColor();
        saveCurrentContentObject();
    });

    $('#projector_bg_color').val(currentContentObject.bgColor);
    setBGColor();

    $('#set_projector_opacity').on('click', function() {
        currentContentObject.bgOpacity = $('#projector_opacity').val();
        setBGOpacity();
        saveCurrentContentObject();
    });

    $('#projector_opacity').val($('#cloneWinVidContainer').css('opacity') * 100);

    $('.media-chooser').on('click', function(event) {
        currentContentObject.bgResourceId = $(event.target).attr('rel');
        setBackground();
        saveCurrentContentObject();
    });

    $('.clear-background').on('click', function(event) {
        bgType = '';
        bgUrl = '';
        currentContentObject.bgResourceId = null;
        setMediaBackground();
        saveCurrentContentObject();
    });

    $('#set_font_btn').on('click', function() {
        currentContentObject.fontFamily = $('#set_font_family').val();
        setLiveFont();
        saveCurrentContentObject();
    });
    $('#set_font_family').val(defaultFont);

    $('#set_font_size_btn').on('click', function() {
        currentContentObject.fontSize = $('#set_font_size').val();
        setLiveFontSize();
        saveCurrentContentObject();
    });
    $('#set_font_size').val( defaultFontSize );

    $('#set_font_defaults').on('click', function() {
        currentContentObject.fontSize = defaultFontSize;
        currentContentObject.fontFamily = defaultFont;
        setLiveFontSize();
        setLiveFont();
        $('#set_font_family').val(defaultFont);
        $('#set_font_size').val(defaultFontSize);
    });

    liveViewPort = $('#clone_lyric_block');

    initComplete = true;
}

/**
 * Two different on-document-ready events depending on how the page was loaded
 */
$(document).ready(function() { // event does not fire when page loads from index link
    initElements();
});

if(!initComplete) {
    // this event fires when page loads from programmes index link
    $(document).on('page:load', function() { initElements();});
}
;
