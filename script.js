function setAnchors() {

    let buttons = document.querySelectorAll("button[href],.button[href]");

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