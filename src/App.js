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

function App() {
    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3000/sse/notify');
        eventSource.onmessage = function(event) {
            const data = JSON.parse(event.data);
            console.log(data);
            alert('Received a new job: ' + JSON.stringify(data));
        };

        return () => {
            eventSource.close();
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
                    </Routes>
                </Router>
            </div>
        </ChakraProvider>
    );
}

export default App;
