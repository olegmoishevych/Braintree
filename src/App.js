import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BraintreePayment from "./Braintree";
import CancelSubscription from "./CancelSubscription";
import {ChakraProvider} from "@chakra-ui/react";
import React from "react";
import UpdateSubscription from "./Update";

function App() {
    return (
        <ChakraProvider>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/subscribe" element={<BraintreePayment />} />
                        <Route path="/cancel" element={<CancelSubscription />} />
                        <Route path="/update" element={<UpdateSubscription />} />
                    </Routes>
                </Router>
            </div>
        </ChakraProvider>
    );
}

export default App;
