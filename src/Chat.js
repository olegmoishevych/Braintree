import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import {useParams} from "react-router-dom";

function ChatComponent() {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [messageInput, setMessageInput] = useState(''); // Добавим состояние для текущего вводимого сообщения

    const { professionalID, clientID, jobID } = useParams();


    useEffect(() => {
        const socket = io('http://localhost:3000');
        setSocket(socket);

        socket.on('createMessage', (message) => {
            setMessages(messages => [...messages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [professionalID, clientID, jobID]); // Добавлены как зависимости



    const sendMessage = () => {
        if (socket && messageInput) {
            console.log({
                senderId: clientID,
                text: messageInput,
                receiverId: professionalID,
                jobId: jobID
            });

            socket.emit('createMessage', {
                senderId: clientID,
                text: messageInput,
                receiverId: professionalID,
                jobId: jobID
            });

            setMessageInput('');
        }
    };








    return (
        <div>
            {messages.map((message, index) => (
                <p key={index}>{message.content}</p>
            ))}
            {/* Добавляем поле ввода и кнопку отправки */}
            <input
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                type="text"
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send message</button>
        </div>
    );
}

export default ChatComponent;
