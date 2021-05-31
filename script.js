function init() {
    setFullscreenViewerOpeners();
    setFullscreenViewerCloser();
    setFullscreenViewerArrows();
    setAnchors();
    setViewerScrollButtons();
    setViewerImageButtons();
    setProjectContentSelectors();

    document.querySelector("main").addEventListener('scroll', checkScroll, {passive: true});
}

function setFullscreenViewerCloser()
{
    let viewerWindow = document.getElementById("fullscreen_viewer_window");
    
    let closer = document.querySelector(".close_button_container .simple_button");
    
    closer.addEventListener("click", () => {
        viewerWindow.classList.add("hidden");
    });

    let fullscreenViewerContainer = document.querySelector(".fullscreen_viewer_img_container img");
    fullscreenViewerContainer.addEventListener("click", e => {
        //stop the event propagating to the body element
        var evt = e ? e : window.event;

        if (evt.stopPropagation) {evt.stopPropagation();}
        else {evt.cancelBubble=true;}
        return false;
    });

    viewerWindow.addEventListener("click", () => {
        viewerWindow.classList.add("hidden");
    });
}

function setFullscreenViewerArrows()
{
    let arrows = document.querySelectorAll("#fullscreen_viewer_window .arrow_container ");

    arrows.forEach(arrow => {
        arrow.addEventListener("click", e => {
            let viewerWindow = document.getElementById("fullscreen_viewer_window");
            let viewer = viewerWindow.querySelector(".fullscreen_viewer_img_container img");

            let srcs = JSON.parse(viewerWindow.dataset.srcs);

            
            let arrowDirection = (arrow.classList.contains("left") ? -1 : 1);
            
            let index = parseInt(viewerWindow.dataset.index) + arrowDirection;
            if (index >= srcs.length) index = srcs.length -1;
            else if (index < 0) index = 0;
            
            viewer.src = srcs[index];
            viewerWindow.dataset.index = index;

            //stop the event propagating to the body element
            var evt = e ? e : window.event;

            if (evt.stopPropagation) {evt.stopPropagation();}
            else {evt.cancelBubble=true;}
            return false;
        });
    });
}

function setFullscreenViewerOpeners()
{
    let openers = document.querySelectorAll("img.display");

    openers.forEach(opener => {
        opener.addEventListener("click", () => {
            let viewerWindow = document.getElementById("fullscreen_viewer_window");

            let images = Array.from(opener.closest(".viewer").querySelectorAll(".images_selector img"));
            let srcs = [];
            images.forEach(image => {
                srcs.push(image.src);
            });

            let index = ("dataset" in opener && "index" in opener.dataset ? opener.dataset.index : 0);

            viewerWindow.dataset.index = index;
            viewerWindow.dataset.srcs = JSON.stringify(srcs);
            viewerWindow.querySelector(".fullscreen_viewer_img_container img").src = srcs[index];
            viewerWindow.classList.remove("hidden");
        });
    });
}

function setAnchors() {

    let buttons = document.querySelectorAll(".anchor_button[href]:not(.project_content_selector)");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            let element = document.querySelectorAll(button.getAttribute("href"));
            if (element.length > 0) {
                element[0].scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        });
    });

}

function setProjectContentSelectors() {

    let buttons = document.querySelectorAll(".project_content_selector[href]");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            
            let project = button.closest(".project");
            let projectContents = project.querySelectorAll(".project_content, .veille_content");
            let buttonSelectors = project.querySelectorAll(".project_content_selector");
            
            projectContents.forEach(projectContent => {
                projectContent.classList.add("hidden");
                //projectContent.style.display = "none";
            });

            buttonSelectors.forEach(buttonSelector => {
                buttonSelector.classList.remove("selected");
            });

            let target = project.querySelector(button.getAttribute("href"));
            target.classList.remove("hidden");
            button.classList.add("selected");
        });
    });

}

function checkScroll(e) {
    let scroll = document.querySelector("main").scrollTop;
    let header = document.getElementsByTagName("header")[0];
    
    if (scroll > 400) header.classList.add("visible");
    else header.classList.remove("visible");
}

function setViewerImageButtons() {
    let images = document.querySelectorAll(".viewer .images_selector img");

    images.forEach(image => {
        image.addEventListener("click", () => {
            let src = image.getAttribute("src");
            let displayImg = image.closest(".viewer").querySelector(".viewer .display img");

            let images = Array.from(image.closest(".viewer").querySelectorAll(".images_selector img"));

            //console.log("image", image);
            //console.log("images", images);

            let index = images.indexOf(image);

            //console.log("index", index);

            displayImg.setAttribute("src", src);
            displayImg.dataset.index = index;
        });
    });
}

function setViewerScrollButtons()
{
    let buttons = document.querySelectorAll(".viewer .arrow");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            let selectorContainer = button.parentElement.querySelector(".images_selector_container");
            let selector = selectorContainer.querySelector(".images_selector");

            let selectorWidth = selector.clientWidth;
            let selectorContainerWidth = selectorContainer.clientWidth;
            let minLeft = (selectorWidth - selectorContainerWidth) * -1;

            let isLeftButton = button.classList.contains("left");
            let left = selector.style.left;
            if (left.length == 0) left = 0;
            else left = parseInt(left);


            left += 200 * (isLeftButton ? 1 : -1);

            if (left < minLeft) left = minLeft;
            else if (left > 0) left = 0;

            selector.style.left = left + "px";
        })
    });
}