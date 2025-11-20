document.addEventListener("DOMContentLoaded", () => {
  const chatBtn = document.querySelector(".chat-btn");
  if (!chatBtn) return; // por si hay alguna página sin el boton

  // Crea el widget del chatbot y lo inyecta al HTML
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

  function mockReply(text) {
    const msg = text.toLowerCase();
      console.log(stores); //todo usar stores para preguntas

    if (msg.includes("horario") || msg.includes("abren") || msg.includes("abierto")) {
      return "Nuestro horario es de 10:00 a 22:00 todos los días 🕙.";
    }

    if (msg.includes("estacionamiento") || msg.includes("parking")) {
      return "Contamos con estacionamiento cubierto en el subsuelo. La primera hora es sin cargo 🚗.";
    }

    if (msg.includes("cine") || msg.includes("película") || msg.includes("pelicula")) {
      return "El cine está en el 3er piso, sector entretenimiento 🎬.";
    }

    if (msg.includes("locales") || msg.includes("tiendas")) {
      return "Podés ver el listado completo de locales en la sección \"Locales\" del menu superior.";
    }

    return "Por ahora soy un chat de prueba 🤖. Te puedo dar una mano con horarios, estacionamiento, cine y locales.";
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
