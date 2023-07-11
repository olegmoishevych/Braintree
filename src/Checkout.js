import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, VStack } from "@chakra-ui/react";

const Checkout = () => {
    const [amount, setAmount] = useState('');
    const [nonce, setNonce] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/braintree/checkout', {
                amount: amount,
                nonce: nonce
            });
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <VStack spacing={4}>
            <Input
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Enter amount"
                isRequired
            />
            <Input
                value={nonce}
                onChange={e => setNonce(e.target.value)}
                placeholder="Enter nonce"
                isRequired
            />
            <Button isLoading={loading} onClick={handleCheckout}>
                Checkout
            </Button>
        </VStack>
    );
};

export default Checkout;
