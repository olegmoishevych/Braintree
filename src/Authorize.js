import React, { useEffect, useState } from 'react';
import { useToast } from "@chakra-ui/react";
import axios from 'axios';
import braintree from 'braintree-web-drop-in';

const Authorize = () => {
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

    const handleButtonClick = async () => {
        if (!dropinInstance) {
            return;
        }

        try {
            const payload = await dropinInstance.requestPaymentMethod();
            const response = await axios.post('http://localhost:3000/braintree/authorize', {
                nonce: payload.nonce,
                amount: '1000.00', // Здесь вы указываете сумму авторизации
                userId: '123' // Идентификатор пользователя
            });

            toast({
                title: "Success.",
                description: "The funds have been authorized.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "An error occurred.",
                description: "Unable to authorize the funds.",
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
            <button onClick={handleButtonClick}>Authorize</button>
        </div>
    );
};

export default Authorize;
