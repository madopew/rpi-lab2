const hints = [
    ["Email", "You can use email to email someone you love but they don't have to love you back."],
    ["Button", "You can click button to make someone laugh unexpectedly and unconsciously."],
    ["Mouse", "Use your mouse to destroy every living thing on the planet Earth by moving it faster than speed of light.\nJust kidding."],
];

let menu = new HintMenu("hintMenu", hints);

$(function() {
    console.log("start");
    setTimeout(displayMenu, 5000);
});

document.onkeydown = (e) => {
    menu.keypress(e.which);
}

displayMenu = () => {
    console.log("display");
    menu.display();
}