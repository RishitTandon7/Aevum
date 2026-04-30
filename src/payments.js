const loadRazorpay = () => new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
});

export async function startCheckout({ authFetch, user, amount, description, bookingType }) {
    const orderData = await authFetch('/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({ amount, bookingType })
    });

    if (orderData.mode === 'mock') {
        const verified = await authFetch('/api/payments/verify', {
            method: 'POST',
            body: JSON.stringify({
                mode: 'mock',
                razorpay_order_id: orderData.order.id,
                razorpay_payment_id: `pay_dev_${Date.now()}`
            })
        });
        return { ...verified, mode: 'mock' };
    }

    const ready = await loadRazorpay();
    if (!ready) throw new Error('Razorpay checkout could not be loaded');

    return new Promise((resolve, reject) => {
        const checkout = new window.Razorpay({
            key: orderData.keyId,
            amount: orderData.order.amount,
            currency: orderData.order.currency,
            name: 'Aevum',
            description,
            order_id: orderData.order.id,
            prefill: {
                name: user?.name || '',
                email: user?.email || ''
            },
            theme: { color: '#4f46e5' },
            handler: async (response) => {
                try {
                    const verified = await authFetch('/api/payments/verify', {
                        method: 'POST',
                        body: JSON.stringify(response)
                    });
                    resolve(verified);
                } catch (error) {
                    reject(error);
                }
            },
            modal: {
                ondismiss: () => reject(new Error('Payment cancelled'))
            }
        });
        checkout.open();
    });
}
