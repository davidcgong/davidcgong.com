import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor'
import Subscription from '../Subscription/Subscription';

// configure our toast for sub pop-up
toast.configure({
    autoClose: 20000,
    draggable: false,
    closeOnClick: false,
    hideProgressBar: true
})

const SubscriptionPopup = () => {
    const popup = () => toast(<Subscription />, {toastId: ''});

    return (
        popup()
    );
    
};

export default SubscriptionPopup;