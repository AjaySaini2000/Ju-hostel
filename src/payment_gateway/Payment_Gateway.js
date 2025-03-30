// import React from 'react';

// const Payment_Gateway = ({ Price, onPaymentSuccess, buttonContent }) => {
//     console.log("Price:", Price);

//     // Load the Razorpay checkout script
//     const loadRazorpayScript = () => {
//         return new Promise((resolve) => {
//             const script = document.createElement('script');
//             script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//             script.onload = () => resolve(true);
//             script.onerror = () => resolve(false);
//             document.body.appendChild(script);
//         });
//     };

//     // Handle payment when the button is clicked
//     const handlePayment = async (e) => {
//         e.preventDefault(); // Prevent default behavior
//         console.log("Initiating Payment...");

//         const res = await loadRazorpayScript();
//         if (!res) {
//             alert('Razorpay SDK failed to load. Are you online?');
//             return;
//         }

//         const options = {
//             // key: 'rzp_test_pPEb1wAu9J7WUF', // Replace with your Razorpay test key
//             // key_secret: 'fQRKolZytD1rBPvNgIsPjAmK', // Replace with your Razorpay test key_secret
//             key: 'rzp_test_pPEb1wAu9J7WUF', // Replace with your Razorpay test key
//             amount: Price * 100, // Amount in paise (multiply by 100)
//             currency: 'INR',
//             description: 'Test Transaction',
//             image: 'https://your-logo-url.com/logo.png',
//             handler: function (response) {
//                 console.log('Payment Success:', response);
//                 // Call the success callback with transaction details
//                 onPaymentSuccess({
//                     transaction_id: response.razorpay_payment_id,
//                     payment_status: 'Success',
//                 });
//             },
//             prefill: {
//                 name: 'ju hostel',
//                 email: 'test123@gmail.com',
//                 contact: '9876543210',
//             },
//             theme: {
//                 color: '#F37254',
//             },
//         };

//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//     };

//     return (
//         <button
//             type="button"
//             onClick={handlePayment}
//             className="btn btn-danger js-btn-next p-2 px-4 mt-2 text-white"
//         >
//             {buttonContent || "Book Now"}
//         </button>
//     );
// };

// export default Payment_Gateway;



import React from 'react';

const Payment_Gateway = ({ Price, onPaymentSuccess, buttonContent }) => {
    console.log("Price:", Price);

    // Load the Razorpay checkout script
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // Handle payment when the button is clicked
    const handlePayment = async (e) => {
        e.preventDefault(); // Prevent default behavior
        console.log("Initiating Payment...");

        const res = await loadRazorpayScript();
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        const options = {
            key: 'rzp_test_pPEb1wAu9J7WUF', // Replace with your Razorpay key
            amount: Price * 100, // Convert to paise
            currency: 'INR',
            description: 'Test Transaction',
            image: 'https://your-logo-url.com/logo.png',
            handler: function (response) {
                console.log('Payment Success:', response);
                
                // ✅ Send correctly formatted data
                onPaymentSuccess({
                    transaction_id: response.razorpay_payment_id,
                    payment_method: "Online", // Fixed this missing field
                    status: "success", // Matching expected format
                });
            },
            prefill: {
                name: 'ju hostel',
                email: 'test123@gmail.com',
                contact: '9876543210',
            },
            theme: {
                color: '#F37254',
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <button
            type="button"
            onClick={handlePayment}
            className="btn btn-danger js-btn-next p-2 px-4 mt-2 text-white"
        >
            {buttonContent || "Book Now"}
        </button>
    );
};

export default Payment_Gateway;
