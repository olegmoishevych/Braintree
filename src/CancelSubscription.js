import React, { useState } from 'react';
import { useToast } from "@chakra-ui/react"
import axios from 'axios';

const CancelSubscription = () => {
    const toast = useToast();
    const [subscriptionId, setSubscriptionId] = useState('fgypy7');

    const handleButtonClick = async () => {
        try {
            await axios.post('http://localhost:3000/braintree/cancel-subscription', {
                subscriptionId,
            });
            toast({
                title: "Success.",
                description: "The subscription has been canceled successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "An error occurred.",
                description: "Unable to cancel the subscription.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            console.error(error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={subscriptionId}
                onChange={e => setSubscriptionId(e.target.value)}
                placeholder="Subscription ID"
            />
            <button onClick={handleButtonClick}>Cancel Subscription</button>
        </div>
    );
};

export default CancelSubscription;
