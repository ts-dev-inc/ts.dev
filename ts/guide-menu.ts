function toggle(button: HTMLButtonElement) {
  button.classList.toggle("active");
}

function closeSideNav() {
  document.getElementById("guide-nav-button")?.classList.remove("active");
}

window.addEventListener("load", loaded);

function loaded() {
  const options = {
    root: document.querySelector(".sg-container"),
    rootMargin: `0px 0px -90% 0px`,
    threshold: 0.5,
  };

  const tocElement = document.querySelector(".toc")!;
  const tocAnchors = tocElement.querySelectorAll("a")!;
  const headers = document.querySelectorAll("h2, h3, h4");

  tocAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => {
      tocAnchors.forEach((other) => {
        if (other.classList.contains("active")) {
          other.classList.remove("active");
        }
      });
      anchor.classList.add("active");
    });
  });

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const href = entry.target.getElementsByTagName("a")[0].href;
        for (const navItem of tocAnchors) {
          if (navItem.classList.contains("active")) {
            navItem.classList.remove("active");
          }
          if (navItem.href === href) {
            navItem.classList.add("active");
            navItem.scrollIntoView({ behavior: "smooth", block: "center" });
            history.pushState({}, document.title, href);
          }
        }
      }
    });
  }, options);

  headers.forEach((header) => {
    observer.observe(header);

    const link = document.createElement("a");
    link.href = "#" + header.id;
    link.classList.add("clipboard");

    const img = document.createElement('img');
    img.style.display = "inline-block";
    img.style.color = "white";
    img.style.height = "24px";
    img.src = "/svg/link.svg";
    img.alt = "copy link to the clipboard";
    link.appendChild(img);
    link.addEventListener("click", (event) => {
      event.preventDefault(); // do not navigate on click.
      navigator.clipboard.writeText(link.href).then(() => {
        const toast = document.createElement("span");
        toast.classList.add("clipboard-confirm");
        toast.innerText = "Copied";
        link.append(toast);
        setTimeout(() => {
          toast.remove();
        }, 1000);
      });
    });
    header.append(link);
  });
}
