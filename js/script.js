let collapsible = document.getElementsByClassName("collapseLabel");

for (let i = 0; i < collapsible.length; i++) {
  collapsible[i].addEventListener("click", function () {
    // this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.display === "flex") {
      this.classList.remove("changeLabelColor");
      this.childNodes[3].classList.remove("rotation");
      content.style.display = "none";
    } else {
      content.style.display = "flex";
      this.classList.add("changeLabelColor");
      this.childNodes[3].classList.add("rotation");
    }
  });
}
