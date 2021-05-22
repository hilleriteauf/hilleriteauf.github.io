function init() {
    setAnchors();

    window.addEventListener('scroll', checkScroll, {passive: true});
}

function setAnchors() {

    let buttons = document.querySelectorAll(".anchor_button[href]");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            let element = document.querySelectorAll(button.getAttribute("href"));
            if (element.length > 0) {
                element[0].scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

}

function checkScroll(e) {
    let scroll = window.scrollY;
    let header = document.getElementsByTagName("header")[0];
    
    if (scroll > 400) header.classList.add("visible");
    else header.classList.remove("visible");
}