document.addEventListener("scroll", function () {
    const cards = document.querySelectorAll(".cards");

    cards.forEach((cards) => {
        const rect = cards.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            cards.classList.add("show");
        } else {
            cards.classList.remove("show");
        }
    });
});