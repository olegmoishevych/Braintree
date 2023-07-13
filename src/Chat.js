import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

function ChatComponent() {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [messageInput, setMessageInput] = useState('');

    const { professionalID, clientID, jobID } = useParams();

    useEffect(() => {
        const socket = io('http://localhost:3000');
        setSocket(socket);

        socket.on('newMessage', (message) => {
            setMessages(messages => [...messages, message]);
        });

        socket.on('chatFound', (chat) => {
            if (chat && chat.messages) {
                setMessages(chat.messages);
            }
        });

        socket.emit('findChat', {jobId: jobID});

        return () => {
            socket.disconnect();
        };
    }, [jobID, messages.length]);

    const sendMessage = () => {
        if (socket && messageInput) {
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
                <div key={index}>
                    <p>
                        {message.senderId === clientID ? 'Вы' : 'Профессионал'}: {message.text}
                    </p>
                </div>
            ))}
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
