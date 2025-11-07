const roomData = document.getElementById("room-data");
const roomId = roomData.getAttribute("data-room-id");
const username = roomData.getAttribute("data-username");
const userId = roomData.getAttribute("data-user-id");

const ws = new WebSocket(`ws://localhost:8000/ws/chat/${roomId}/${userId}?username=${username}`);


ws.onopen = () => {
    console.log("Соединение установлено");
};

ws.onclose = () => {
    console.log("Соединение закрыто");
};

ws.onmessage = (event) => {
    const messages = document.getElementById("messages");
    const messageData = JSON.parse(event.data);
    const message = document.createElement("div");

    // Определяем стили в зависимости от отправителя
    if (messageData.is_self) {
        message.className = "p-2 my-1 bg-blue-500 text-white rounded-md self-end max-w-xs ml-auto";
    } else {
        message.className = "p-2 my-1 bg-gray-200 text-black rounded-md self-start max-w-xs";
    }

    message.textContent = messageData.text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight; // Автопрокрутка вниз
};


function sendMessage() {
    const input = document.getElementById("messageInput");
    if (input.value.trim()) {
        ws.send(input.value);
        input.value = '';
    }
}

document.getElementById("messageInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});