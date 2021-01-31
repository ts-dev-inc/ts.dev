
function toggle(button: HTMLButtonElement) {
    button.classList.toggle("active");
}

function closeSideNav() {
    document.getElementById("guide-nav-button")?.classList.remove("active");
}