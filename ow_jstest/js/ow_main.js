
    var myNewWindow;
    var currentSlide;
    var lyricElement;
    var liveViewPort;
    var videoElement;
    var bgUrl;
    var bgType;

    function closeProjector() {
        myNewWindow.close();
        myNewWindow = null;
    }

    function initProjectorWindow() {
        var NewWindow = window.open("about:blank", '_blank','right=1500, top=0, width=800,height=600,addressbar=no,toolbar=no,scrollbars=no');
        // alert("Preparing window, press okay to continue");
        return NewWindow;
    }

    function loadProjectorWindow() {
        if(myNewWindow == undefined || myNewWindow == null) {

        myNewWindow = initProjectorWindow();
        myNewWindow.onbeforeunload = function(){ myNewWindow = null; }
        myNewWindow.document.body.style.backgroundColor="black";


                var csslink = document.createElement("link");
                    csslink.href = "http://workspace.com/ow_jstest/vidwinstyles.css";
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
                lyric_block.innerHTML = this.currentSlide;

                var vidContainer = myNewWindow.document.createElement("div");
                vidContainer.setAttribute("id","vidContainer");

                vidContainer.appendChild(lyric_block);


                vidContainer.appendChild(videoElement);
              myNewWindow.document.body.appendChild(vidContainer);

                lyricElement = myNewWindow.document.getElementById("proj_content_block");

        }
    }

    function loadContentList(userID) {



    }

    function loadLiveSlides(id) {

        var slideData;
        // $.get("SongSlides/loaddata?id="+id, function( data ) {
        //     slideData = $.parseJSON(data);
        //     bgUrl = slideData.r.resource_url;
        //     bgType = slideData.r.resource_type;

        //     var slideArr = slideData.s.song_content.split("<hr />");
        //     var slideContent = "";
        //     for(var slide in slideArr) {
        //         slideContent += "<div class='slide_content'>";
        //         slideContent += slideArr[slide] != undefined ? slideArr[slide] : "";
        //         slideContent += "</div>";
        //     }

        //         $( "#slides" ).html( slideContent );
        //         $('.slide_content').click(function() { change_content(this); });
        //       });

         //var loadedSlides = $("#slides").children();
        $("#slides div:nth-child(1)").css("backgroundColor","#A2D3A2");
        //document.getElementById("slides").children[0].style.backgroundColor = "#A2D3A2";

    }

    function change_content(content_element) {
        var content = (content_element != undefined ) ? content_element.innerHTML : "";
        if(videoElement != undefined) {
            videoElement.style.display = "block";
            videoElement.play();
        }
        if(myNewWindow != null) {
            lyricElement.innerHTML = content;
        }

        $('#lyric_block').html(content);
        // liveViewPort.innerHTML = content;

        var slideChildren = document.getElementById("slides").childNodes;
        for (var i = 0; i < slideChildren.length; i++) {
          var childSlide = slideChildren[i];

          if(childSlide.nodeType == 1)
          childSlide.style.backgroundColor="white";
        }
        this.currentSlide = content;
        content_element.style.backgroundColor="#A2D3A2";
    }

    function blackScreen() {
        if(myNewWindow != undefined) {
           lyricElement.innerHTML = "";
           liveViewPort.innerHTML = "";
           videoElement.pause();
           videoElement.style.display = "none";
        }
    }

    $(document).ready(function() {
        bgUrl = "http://workspace.com/ow_jstest/videos/bgloop.mp4";
        bgType = "video/mp4";
        change_content($('.slide_content')[0]);
        liveViewPort = document.getElementById("live_content_block");

        loadLiveSlides(1);

    });
