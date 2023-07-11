import React, { useState } from 'react';
import { useToast } from "@chakra-ui/react";
import axios from 'axios';

const Capture = () => {
    const toast = useToast();
    const [userId, setUserId] = useState('123'); // Идентификатор пользователя

    const handleButtonClick = async () => {
        try {
            const response = await axios.post('http://localhost:3000/braintree/capture', { userId });

            toast({
                title: "Success.",
                description: "The funds have been captured.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "An error occurred.",
                description: "Unable to capture the funds.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Capture</button>
        </div>
    );
};

export default Capture;
