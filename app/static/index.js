const roomData = document.getElementById("room-data");
const roomId = roomData.getAttribute("data-room-id");
const username = roomData.getAttribute("data-username");
const userId = roomData.getAttribute("data-user-id");

// 1. Определяем протокол: 'wss:' (для https) или 'ws:' (для http)
const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

// 2. Определяем хост (это будет ваш URL от tuna, например "xxxx.tuna.fun")
const host = window.location.host;

// 3. Собираем полный, корректный URL для WebSocket
const wsUrl = `${protocol}//${host}/ws/chat/${roomId}/${userId}?username=${username}`;

console.log(`Подключаемся к WebSocket по адресу: ${wsUrl}`);

// 4. Создаем WebSocket с новым URL
const ws = new WebSocket(wsUrl);

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