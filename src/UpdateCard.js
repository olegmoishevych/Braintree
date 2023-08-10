import React, { useEffect, useState } from 'react';
import { useToast } from "@chakra-ui/react";
import axios from 'axios';
import braintree from 'braintree-web-drop-in';

const UpdateCard = () => {
    const toast = useToast();
    const [dropinInstance, setDropinInstance] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/braintree/token');
                const clientToken = response.data.data;
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

    const handleUpdateButtonClick = async () => {
        if (!dropinInstance) {
            return;
        }

        try {
            const payload = await dropinInstance.requestPaymentMethod();
            const response = await axios.put('http://localhost:3000/braintree/update-card', {
                paymentMethodNonce: payload.nonce,
            });
            toast({
                title: "Success.",
                description: "The card details have been updated successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "An error occurred.",
                description: "Unable to update the card details.",
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
            <button id="update-button" onClick={handleUpdateButtonClick}>Update Card</button>
        </div>
    );
};

export default UpdateCard;
