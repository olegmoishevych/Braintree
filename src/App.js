import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BraintreePayment from "./Braintree";
import CancelSubscription from "./CancelSubscription";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import UpdateSubscription from "./Update";
import Checkout from "./Checkout";
import Authorize from "./Authorize";
import Capture from "./Capture";
import { io } from "socket.io-client";
import ChatComponent from "./Chat";

function App() {
    useEffect(() => {
        const socket = io('http://localhost:3000'); // замените на адрес вашего сервера

        socket.on('createMessage', (message) => {
            console.log('Received a new message:', message);
            alert('Received a new message: ' + JSON.stringify(message));
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <ChakraProvider>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/subscribe" element={<BraintreePayment />} />
                        <Route path="/cancel" element={<CancelSubscription />} />
                        <Route path="/update" element={<UpdateSubscription />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/authorize" element={<Authorize />} />
                        <Route path="/capture" element={<Capture />} />
                        <Route path="/chat" element={<ChatComponent />} />
                    </Routes>
                </Router>
            </div>
        </ChakraProvider>
    );
}

export default App;
