var initComplete = false;
var defaultFontSize = '16';
var defaultFont = "Arial";
var currFont = defaultFont;
var currFontSize = defaultFontSize;
var fontColor = '#000000';
var vidBGColor = '#bbddff';
var myNewWindow;
var currentSlide;
var lyricElement;
var liveViewPort;
var videoElement;
var bgUrl;
var bgType;
var hostWithPort;

function closeProjector()
{
    myNewWindow.close();
    myNewWindow = null;
}

function initProjectorWindow()
{
    var NewWindow = window.open("about:blank", '_blank','width=800,height=600');

    return NewWindow;
}

function setMediaBackground()
{
    switch (bgType) {
        case 'video/mp4':
        if(myNewWindow != null) {
            videoElement = myNewWindow.document.createElement("video");
            videoElement.setAttribute("id","proj_video_background");
            videoElement.setAttribute("preload","auto");

            videoElement.setAttribute("autoplay","true");
            videoElement.setAttribute("loop","loop");
            videoElement.setAttribute("muted","muted");
            videoElement.setAttribute("volume","0");

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

function setBGOpacity(opacityPercent)
{
    var opacity = opacityPercent / 100;
    if(myNewWindow != null) {
        $(myNewWindow.document.getElementById("vidContainer")).css('opacity', opacity );
    }

    $('#cloneWinVidContainer').css('opacity', opacity);
    opacityPercent = opacity * 100;
    $('#projector_opacity').val(opacityPercent);
}

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
        myNewWindow.document.getElementsByTagName("head")[0].appendChild(csslink);

        var lyric_block_container = myNewWindow.document.createElement("div");
        lyric_block_container.setAttribute("id","proj_content_container");

        var lyric_block = myNewWindow.document.createElement("div");
        lyric_block.setAttribute("id","proj_content_block");
        lyric_block.innerHTML = currentSlide != undefined ? currentSlide : '' ;

        lyric_block_container.appendChild(lyric_block);

        var vidContainer = myNewWindow.document.createElement("div");
        vidContainer.setAttribute("id","vidContainer");

        // vidContainer.appendChild(lyric_block);


        // vidContainer.appendChild(videoElement);
        myNewWindow.document.body.appendChild(vidContainer);
        myNewWindow.document.body.appendChild(lyric_block_container);

        lyricElement = myNewWindow.document.getElementById("proj_content_block");
        setBGColor();
        setFontColor();
    }
}

function setBackground(resourceId)
{
    $.get("/resources/" + resourceId + ".json", function( resourceObj) {
        bgUrl = resourceObj.location;
        bgType = resourceObj.resourceType;
        setMediaBackground();
    } );
}

function loadContentItem(id, type)
{
    var slideData;
    $.get("/" + type + "/" + id + ".json", function( data ) {
        var slideContent = data.content.replace(/\[(.*?)\]/g,
               "</div><label class='slide_label'>$1</label> \
                <div class='slide_content'><p>");

        slideContent = "<div>" + slideContent;
        slideContent = slideContent.replace(/(?:\r\n|\r|\n)/g, '</p><p class="lyric-line">');
        slideContent += "</p></div>";
        slideContent = slideContent.replace("<p></p>",'');

        $( "#slides" ).html( slideContent );
        $('.slide_content').click(function() { change_content(this); });
    });

    $("#slides div:nth-child(1)").css("backgroundColor","#A2D3A2");
    setFontColor();
    setBGColor();
}

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

    var slideChildren = document.getElementById("slides").childNodes;
    for (var i = 0; i < slideChildren.length; i++) {
        var childSlide = slideChildren[i];

        if(childSlide.nodeType == 1)
            childSlide.style.backgroundColor="white";
    }
    this.currentSlide = content;
    $(content_element).css('backgroundColor','#A2D3A2');
    setLiveFont();
    setLiveFontSize();
    setFontColor();
    setBGColor();
}

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

function setFontColor()
{
    if(myNewWindow != null) {
        $(lyricElement).css('color', fontColor );
    }
    $('#clone_lyric_block .lyric-line').css('color', fontColor);
}

function setBGColor()
{
    if(myNewWindow != null) {
        $(myNewWindow.document.body).css('background-color', vidBGColor );
    }
    $('#cloneWindowBody').css('background-color', vidBGColor);
}

var cloneLyricElement = document.getElementById('clone_lyric_block');

function setLiveFontSize() {
    $('#clone_lyric_block .lyric-line').css('font-size', Math.ceil( currFontSize ));
    if(myNewWindow != null) {
        $(lyricElement)
            .css('font-size', Math.ceil( currFontSize * 2.5 ));
    }
}

function setLiveFont() {
    $('#clone_lyric_block .lyric-line').css('font-family', currFont);
    if(myNewWindow != null) {
        $(lyricElement)
            .css('font-family', currFont);
    }
}

function initElements()
{
    $('.slide_content').on('click', function(event) {
        change_content(event.target);
    });

    $('.song_scheduler').on('click', function(event) {
        loadContentItem($(event.target).attr('rel'), 'songs');
    });

    $('.scripture_scheduler').on('click', function(event) {
        loadContentItem($(event.target).attr('rel'), 'scriptures');
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
        color: fontColor,
        onSelect: function(color){
            $("input#font_color").val(color);
            $('#fontColorPicker').css('background', color).val(color);
        }
    });

    $('#bgPicker').wColorPicker({
        mode: 'click',
        color: vidBGColor,
        onSelect: function(color){
            $("input#projector_bg_color").val(color);
            $('#bgPicker').css('background', color).val(color);
        }
    });

    $('#set_projector_font_color').on('click', function() {
        fontColor = $('#font_color').val();
        setFontColor();
    });

    $('#font_color').val(fontColor);
    setFontColor();

    $('#set_projector_bg_color').on('click', function() {
        vidBGColor = $('#projector_bg_color').val();
        setBGColor();
    });

    $('#projector_bg_color').val(vidBGColor);
    setBGColor();

    $('#set_projector_opacity').on('click', function() {
        setBGOpacity($('#projector_opacity').val());
    });

    $('#projector_opacity').val($('#cloneWinVidContainer').css('opacity') * 100);

    $('.media-chooser').on('click', function(event) {
        setBackground($(event.target).attr('rel'));
    });

    $('.clear-background').on('click', function(event) {
        bgType = '';
        bgUrl = '';
        setMediaBackground();
    });

    $('#set_font_btn').on('click', function() {
        currFont = $('#set_font_family').val();
        setLiveFont();
    });
    $('#set_font_family').val(defaultFont);

    $('#set_font_size_btn').on('click', function() {
        currFontSize = $('#set_font_size').val();
        setLiveFontSize();
    });
    $('#set_font_size').val( defaultFontSize );

    $('#set_font_defaults').on('click', function() {
        currFontSize = defaultFontSize;
        currFont = defaultFont;
        setLiveFontSize();
        setLiveFont();
        $('#set_font_family').val(defaultFont);
        $('#set_font_size').val(defaultFontSize);
    });

    liveViewPort = $('#clone_lyric_block');

    initComplete = true;
}

$(document).ready(function() { initElements();});
$(document).on('page:load', function() { initElements();});
// rails doesn't always trigger $(document).ready
