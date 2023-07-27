import React, { useEffect, useState } from 'react';
import { useToast } from "@chakra-ui/react"
import axios from 'axios';
import braintree from 'braintree-web-drop-in';

const BraintreePayment = () => {
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
    console.log('123')
    const handleButtonClick = async () => {
        if (!dropinInstance) {
            return;
        }

        try {
            const payload = await dropinInstance.requestPaymentMethod();
            const response = await axios.post('http://localhost:3000/braintree/subscribe', {
                paymentMethodNonce: payload.nonce,
                planId: 'pfyr',
            });
            console.log('res', response.data.subscription.subscriptionId)
            // const subscriptionId = response.data.subscription.id;
            // console.log("Subscription ID:", subscriptionId);
            toast({
                title: "Success.",
                description: "The subscription has been created successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "An error occurred.",
                description: "Unable to create the subscription.",
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
            <button id="submit-button" onClick={handleButtonClick}>Subscribe</button>
        </div>
    );
};

export default BraintreePayment;
