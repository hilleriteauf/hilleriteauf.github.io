setAnchors();

function setAnchors() {
    
    let buttons = document.querySelectorAll("button[href]");

    buttons.forEach(element => {
        console.log("bouton : ", element);
        element.addEventListener("click", () => {
            console.log("scroll !");
            element.scrollIntoView({
                behavior: "smooth",
                block : "start"
            });
        });
    });

}