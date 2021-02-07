
function toggle(button: HTMLButtonElement) {
    button.classList.toggle("active");
}

function closeSideNav() {
    document.getElementById("guide-nav-button")?.classList.remove("active");
}

document.querySelectorAll('h2, h3, h4').forEach((header) => {
    const link = document.createElement("a");
    link.href = "#" + header.id;
    link.classList.add('clipboard');
    link.innerText = "📋";
    link.addEventListener('click', (event) => {
        event.preventDefault(); // do not navigate on click.
        navigator.clipboard.writeText(link.href).then(() => {
            const toast = document.createElement('span');
            toast.classList.add('clipboard-confirm');
            toast.innerText = "Copied";
            link.append(toast);
            setTimeout(() => {
                toast.remove();
            }, 1000);
        });
    });
    header.append(link);
});