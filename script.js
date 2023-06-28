// Boje
function generateRandomColor() {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff", "#ff00ff"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  
  //Scaledrone servis
  const drone = new Scaledrone("aCR0wZvgbOw3vSGy");
  
  // Elementi DOM-a
  const chatArea = document.getElementById("chat-area");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-btn");
  
  // Trenutni korisnik
  const currentUser = {
    name: `User${Math.floor(Math.random() * 20) + 1}`,
    color: generateRandomColor()
  };
  
  //nove poruke
  function displayMessage(user, text) {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<strong style="color: ${user.color}">${user.name}:</strong> ${text}`;
    chatArea.appendChild(messageElement);
    chatArea.scrollTop = chatArea.scrollHeight;
  }
  
  // Slanje poruke
  function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
      const data = {
        name: currentUser.name,
        color: currentUser.color,
        text: message
      };
      drone.publish({
        room: "observable-room",
        message: data
      });
      displayMessage(currentUser, message);
      messageInput.value = "";
    }
  }
  
  // Primljene poruke
  drone.on("message", (message) => {
    const { name, color, text } = message.data;
    if (name !== currentUser.name) {
      displayMessage({ name, color }, text);
    }
  });
  
  // Povezivanje s kanalom
  drone.on("open", () => {
    drone.subscribe("observable-room");
  });
  
  // Pomoć za slanje poruke
  messageInput.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      sendMessage();
    }
  });
  
  //gumb "Poslati"
  sendButton.addEventListener("click", sendMessage);
  