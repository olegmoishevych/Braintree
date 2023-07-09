import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const UpdateSubscription = () => {
    const toast = useToast();
    const [subscriptionId, setSubscriptionId] = useState('fz7mx3');
    const [planId, setPlanId] = useState('pfyr');

    const handleButtonClick = () => {
        axios
            .post('http://localhost:3000/braintree/update-subscription', {
                subscriptionId,
                planId,
            })
            .then(() =>
                toast({
                    title: 'Success.',
                    description: 'The subscription has been updated successfully.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            )
            .catch((err) => {
                toast({
                    title: 'An error occurred.',
                    description: 'Unable to update the subscription.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                console.error(err);
            });
    };

    return (
        <div>
            <input
                type="text"
                value={subscriptionId}
                onChange={(e) => setSubscriptionId(e.target.value)}
                placeholder="Subscription ID"
            />
            <input
                type="text"
                value={planId}
                onChange={(e) => setPlanId(e.target.value)}
                placeholder="Plan ID"
            />
            <button onClick={handleButtonClick}>Update Subscription</button>
        </div>
    );
};

export default UpdateSubscription;
