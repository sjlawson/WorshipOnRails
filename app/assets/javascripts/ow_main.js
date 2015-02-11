var initComplete = false;
var fontColor = '#ffffff';
var vidBGColor = '#3344ff';
var myNewWindow;
var currentSlide;
var lyricElement;
var liveViewPort;
var videoElement;
var bgUrl;
var bgType;

function closeProjector()
{
    myNewWindow.close();
    myNewWindow = null;
}

function initProjectorWindow()
{
    var NewWindow = window.open("about:blank", '_blank','width=800,height=600');
    // alert("Preparing window, press okay to continue");

    return NewWindow;
}

function loadProjectorWindow()
{
    if(myNewWindow == undefined || myNewWindow == null) {

        myNewWindow = initProjectorWindow();
        myNewWindow.onbeforeunload = function(){ myNewWindow = null; }
        myNewWindow.document.body.style.backgroundColor="black";

        var csslink = document.createElement("link");
        csslink.href = "http://localhost:3000/assets/vidwinstyles.css";
        csslink.type = "text/css";
        csslink.rel = "stylesheet";
        myNewWindow.document.getElementsByTagName("head")[0].appendChild(csslink);

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

        videoElement.appendChild(vidSrc);

        var lyric_block = myNewWindow.document.createElement("div");
        lyric_block.setAttribute("id","proj_content_block");
        lyric_block.innerHTML = currentSlide != undefined ? currentSlide : '' ;

        var vidContainer = myNewWindow.document.createElement("div");
        vidContainer.setAttribute("id","vidContainer");

        vidContainer.appendChild(lyric_block);

        vidContainer.appendChild(videoElement);
        myNewWindow.document.body.appendChild(vidContainer);

        lyricElement = myNewWindow.document.getElementById("proj_content_block");
        setBGColor();
        setFontColor();
    }
}

function setBackground(resourceId)
{

}

function loadContentItem(id, type)
{
    var slideData;
    $.get("/" + type + "/" + id + ".json", function( data ) {

        //bgUrl = slideData.r.resource_url;
        //bgType = slideData.r.resource_type;

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
    $('#lyric_block').html(content);

    var slideChildren = document.getElementById("slides").childNodes;
    for (var i = 0; i < slideChildren.length; i++) {
        var childSlide = slideChildren[i];

        if(childSlide.nodeType == 1)
            childSlide.style.backgroundColor="white";
    }
    this.currentSlide = content;
    $(content_element).css('backgroundColor','#A2D3A2');
    setFontColor();
    setBGColor();
}

function blackScreen()
{
    if(myNewWindow != undefined) {
        lyricElement.innerHTML = "";
        liveViewPort.innerHTML = "";
        videoElement.pause();
        videoElement.style.display = "none";
    }
}

function setFontColor()
{
    if(myNewWindow != null) {
        $(lyricElement).css('color', fontColor );
    }
    $('#lyric_block .lyric-line').css('color', fontColor);
}

function setBGColor()
{
    if(myNewWindow != null) {
        $(myNewWindow.document.body).css('background-color', vidBGColor );
    }
    $('#vidPreviewContainer').css('background-color', vidBGColor);
}

var minicolorsSettings = {
    defaults: {
        animationSpeed: 50,
        animationEasing: 'swing',
        change: null,
        changeDelay: 0,
        control: 'hue',
        dataUris: true,
        defaultValue: '',
        hide: null,
        hideSpeed: 100,
        inline: false,
        letterCase: 'lowercase',
        opacity: false,
        position: 'bottom left',
        show: null,
        showSpeed: 100,
        theme: 'bootstrap'
    }
};

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

    $('#goToBlack').on('click', function() {
        blackScreen();
    });

    $('input#font_color').minicolors(minicolorsSettings);
    $('input#projector_bg_color').minicolors(minicolorsSettings);

    $('input#font_color').on('blur', function(event) {
        fontColor = $(event.target).val();
        setFontColor();
    });
    $('input#projector_bg_color').on('blur', function(event) {
        vidBGColor = $(event.target).val();
        setBGColor();
    });

    liveViewPort = $('#lyric_block');

    initComplete = true;
}

$(document).ready(function() { initElements();});
$(document).on('page:load', function() { initElements();}); // rails doesn't always trigger $(document).ready
