function init() {
    setAnchors();
    setViewerScrollButtons();
    setViewerImageButtons();
    setProjectContentSelectors();

    window.addEventListener('scroll', checkScroll, {passive: true});
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
            let projectContents = project.querySelectorAll(".project_content");
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
    let scroll = window.scrollY;
    let header = document.getElementsByTagName("header")[0];
    
    if (scroll > 400) header.classList.add("visible");
    else header.classList.remove("visible");
}

function setViewerImageButtons() {
    let images = document.querySelectorAll(".viewer .images_selector img");

    images.forEach(image => {
        console.log("setting viewer image button", image);
        image.addEventListener("click", () => {
            let src = image.getAttribute("src");
            let displayImg = image.closest(".viewer").querySelector(".viewer .display img");

            displayImg.setAttribute("src", src);
        });
    });
}

function setViewerScrollButtons()
{
    let buttons = document.querySelectorAll(".viewer .arrow");

    buttons.forEach(button => {
        console.log("setting viewer scroll button", button);
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

            console.log("initial left", left);

            left += 200 * (isLeftButton ? 1 : -1);

            if (left < minLeft) left = minLeft;
            else if (left > 0) left = 0;

            selector.style.left = left + "px";
            console.log("final left", selector.style.left);
        })
    });
}