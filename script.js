

document.addEventListener("DOMContentLoaded", function () {
    const storeListEl = document.getElementById("storeList");
    const mapMarkersEl = document.getElementById("mapMarkers");
    const searchInput = document.querySelector(".store-search-input");
    const tagButtons = document.querySelectorAll(".btn-tag");
    let searchTerm = "";
    let activeCategory = "todos"
    let activeStoreId = stores[0]?.id || null;

    function getFilteredStores() {
        return stores.filter((store) => {
            const name = store.name.toLowerCase();
            const cat = store.category.toLowerCase();

            const matchesTerm =
                !searchTerm ||
                name.includes(searchTerm) ||
                cat.includes(searchTerm);

            const matchesCategory =
                !activeCategory || store.categoryKey === activeCategory;
            
            if (activeCategory === "todos") {
                return matchesTerm;
            }

            return matchesTerm && matchesCategory;
        });
    }

    function render() {
        const filtered = getFilteredStores();
        if (filtered.length && !filtered.some((s) => s.id === activeStoreId)) {
            activeStoreId = filtered[0].id;
        }
        if (!filtered.length) {
            activeStoreId = null;
        }

        if (!filtered.length) {
            storeListEl.innerHTML =
                '<li class="text-muted small py-3">No se encontraron locales.</li>';
        } else {
            storeListEl.innerHTML = filtered
                .map(
                    (store) => `
          <li class="store-item ${store.id === activeStoreId ? "active" : ""
                        }" data-store="${store.id}">
            <div class="store-item-left">
              <div class="store-avatar">${store.id}</div>
              <div class="store-text">
                <div class="store-name">${store.name}</div>
                <div class="store-category">${store.category}</div>
                <div class="store-extra">${store.extra}</div>
              </div>
            </div>
            ${ store.link ? `<a href="${store.link}" class="btn btn-store" target="_blank" rel="noopener noreferrer">Visitar</a>` : '' }
          </li>
        `
                )
                .join("");
        }

        storeListEl.querySelectorAll(".store-item").forEach((item) => {
            item.addEventListener("click", () => {
                activeStoreId = item.getAttribute("data-store");
                render();
            });
        });

        mapMarkersEl.innerHTML = filtered
            .map(
                (store) => `
        <div
          class="map-marker ${store.id === activeStoreId ? "active" : ""
                    }"
          data-store="${store.id}"
          style="top:${store.position.top}; left:${store.position.left};"
        >
          ${store.id}
        </div>
      `
            )
            .join("");
    }

    mapMarkersEl.addEventListener("click", (e) => {
        const marker = e.target.closest(".map-marker");
        if (!marker) return;
        activeStoreId = marker.getAttribute("data-store");
        render();
    });

    searchInput.addEventListener("input", (e) => {
        searchTerm = e.target.value.trim().toLowerCase();
        console.log("Search term:", searchTerm);
        render();
    });

    tagButtons.forEach((btn) => {
        btn.addEventListener("click", () => {

            const cat = (btn.dataset.category || "").toLowerCase();

            if (btn.classList.contains("active")) {
                btn.classList.remove("active");
                activeCategory = "";
            } else {
                tagButtons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                activeCategory = cat;
            }
            render();
        });
    });

    render();
});


document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".burger-btn");
    const nav = document.getElementById("mainNav");

    if (!burger || !nav) return;

    function closeMenu() {
      burger.classList.remove("is-open");
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }

    function toggleMenu() {
      const isOpen = burger.classList.toggle("is-open");
      nav.classList.toggle("is-open", isOpen);
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }

    burger.addEventListener("click", toggleMenu);

    nav.querySelectorAll("a.nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 768) {
          closeMenu();
        }
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    });
  });