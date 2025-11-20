document.addEventListener("DOMContentLoaded", () => {
    const chatBtn = document.querySelector(".chat-btn");
    if (!chatBtn) return;

    const chat = document.createElement("div");
    chat.className = "chatbot-widget";
    chat.id = "chatbot";
    chat.innerHTML = `
    <div class="chatbot-header">
      <span>Asistente virtual</span>
      <button type="button" class="chatbot-close" aria-label="Cerrar chat">×</button>
    </div>

    <div class="chatbot-messages" id="chatbotMessages">
      <div class="message bot">
        ¡Hola! Soy el asistente virtual 😊 ¿En que te puedo dar una mano?
      </div>
    </div>

    <form class="chatbot-input" id="chatbotForm">
      <input
        type="text"
        id="chatbotText"
        placeholder="Escribi tu mensaje..."
        autocomplete="off"
      />
      <button type="submit">Enviar</button>
    </form>
  `;
    document.body.appendChild(chat);

    const closeBtn = chat.querySelector(".chatbot-close");
    const form = chat.querySelector("#chatbotForm");
    const input = chat.querySelector("#chatbotText");
    const messages = chat.querySelector("#chatbotMessages");

    function toggleChat() {
        chat.classList.toggle("is-open");
        if (chat.classList.contains("is-open")) {
            input.focus();
        }
    }

    function addMessage(text, who = "bot") {
        const div = document.createElement("div");
        div.classList.add("message", who);
        div.textContent = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function cleanText(str) {
        return str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function mockReply(text) {
        const msg = cleanText(text);

        if (msg.includes("horario") || msg.includes("abren") || msg.includes("abierto")) {
            return "Nuestro horario es de 10:00 a 22:00 todos los días 🕙.";
        }

        if (msg.includes("estacionamiento") || msg.includes("parking")) {
            return "Contamos con estacionamiento cubierto en el subsuelo. La primera hora es sin cargo 🚗.";
        }

        if (msg.includes("cine") || msg.includes("pelicula")) {
            return "El cine está en el 3er piso, sector entretenimiento 🎬.";
        }

        const localMatch = msg.match(/local\s+(\d+)/);

        if (localMatch) {
            const numeroLocal = localMatch[1];

            const store = stores.find(s => s.extra.includes(numeroLocal));

            if (store) {
                return `En el ${store.extra} se encuentra **"${store.name}"** que pertenece a la categoría de *${store.category}*.`;
            } else {
                return `Lo siento, no encontré información sobre el Local ${numeroLocal} 🤔.`;
            }
        }

        const storesByCategory = stores.filter(s => msg.includes(cleanText(s.category)) || msg.includes(cleanText(s.categoryKey)));

        if (storesByCategory.length > 0) {
            const lista = storesByCategory
                .map(s => `• ${s.name} (${s.extra})`)
                .join("\n");

            return `Encontré estos locales de esa categoría:\n${lista}`;
        }

        const storeByName = stores.find(s => msg.includes(cleanText(s.name)));

        if (storeByName) {
            return `**${storeByName.name}** está ubicada en el ${storeByName.extra} (${storeByName.category}).`;
        }

        if (msg.includes("comida") || msg.includes("hambre") || msg.includes("comer")) {
            const foodStores = stores.filter(s => s.categoryKey === "gastronomia");
            const lista = foodStores.map(s => `• ${s.name}`).join(", ");
            return `Para comer tenemos: ${lista}.`;
        }

        if (msg.includes("locales") || msg.includes("tiendas")) {
            return "Podés ver el listado completo de locales en la sección \"Locales\" del menú superior.";
        }

        return "Por ahora soy un chat noob, no te puedo ayudar con eso. 🤖. Preguntame por un número de local (ej: Local 215), por categorías (ej: Tecnología) o servicios.";
    }

    chatBtn.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", toggleChat);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, "user");
        input.value = "";

        setTimeout(() => {
            addMessage(mockReply(text), "bot");
        }, 500);
    });
});
