import React, { useEffect, useState } from 'react';
import { useToast } from "@chakra-ui/react";
import axios from 'axios';
import braintree from 'braintree-web-drop-in';

const Checkout = () => {
    const toast = useToast();
    const [dropinInstance, setDropinInstance] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/braintree/token');
                const clientToken = response.data.data;
                console.log("Received Token: ", clientToken);

                const instance = await braintree.create({
                    authorization: clientToken,
                    container: '#dropin-container'
                });

                setDropinInstance(instance);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleButtonClick = async () => {
        if (!dropinInstance) {
            return;
        }

        try {
            const payload = await dropinInstance.requestPaymentMethod();
            const response = await axios.post('http://localhost:3000/braintree/checkout', {
                nonce: payload.nonce,
                amount: '10.00' // Здесь вы указываете сумму платежа
            });

            console.log('Checkout response:', response.data);

            toast({
                title: "Success.",
                description: "The payment has been made successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "An error occurred.",
                description: "Unable to make the payment.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            console.error(error);
        }
    };

    return (
        <div>
            <div id="dropin-container"></div>
            <button id="submit-button" onClick={handleButtonClick}>Checkout</button>
        </div>
    );
};

export default Checkout;
