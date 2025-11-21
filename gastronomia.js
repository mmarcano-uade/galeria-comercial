document.addEventListener("DOMContentLoaded", function () {
    const circles = document.querySelectorAll(".gastro-circle");
    const cards = document.querySelectorAll(".gastro-menu-card");

    if (!circles.length || !cards.length) return;

    const activateMenu = (key) => {
        cards.forEach(card => {
            const isActive = card.dataset.gastroMenu === key;
            card.classList.toggle("active", isActive);
        });
    };

    circles.forEach(circle => {
        const key = circle.dataset.gastro;
        if (!key) return;

        circle.addEventListener("mouseenter", () => activateMenu(key));
        circle.addEventListener("click", () => activateMenu(key));
    });
});
