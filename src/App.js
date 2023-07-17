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
import ChatComponent from "./Chat";
import CreateJob from "./Job";
import Chat from "./Chat";

function App() {

    const professionalId = '64b57b67ff9295c01a0051ce';

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:3000/sse/notify/${professionalId}`);
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);

            // проверяем, есть ли нужные данные в сообщении
            if(!data.ping) {
                alert(`You have new offer`);
            }

        };

        return () => {
            eventSource.close();
        };
    }, [professionalId]);


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
                        <Route path="/job" element={<CreateJob />} />
                        <Route path="/chat/:clientID/:professionalID/:jobID" element={<Chat />} />
                    </Routes>
                </Router>
            </div>
        </ChakraProvider>
    );
}

export default App;
