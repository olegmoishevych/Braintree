import { useEffect, useState } from 'react';
import { io } from "socket.io-client";

function ChatComponent({ professionalID, clientID }) {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    // Подключитесь к серверу, когда компонент монтируется
    useEffect(() => {
        const socket = io('http://localhost:3000'); // замените на адрес вашего сервера
        setSocket(socket);

        socket.on('createMessage', (message) => {
            setMessages(messages => [...messages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    // Отправьте сообщение, когда пользователь нажимает кнопку "Отправить"
    const sendMessage = (content) => {
        if (socket) {
            socket.emit('createMessage', { content, professionalID, clientID });
        }
    };

    return (
        <div>
            {messages.map((message, index) => (
                <p key={index}>{message.content}</p>
            ))}
            <button onClick={() => sendMessage('Hello!')}>Send message</button>
        </div>
    );
}

export default ChatComponent;
