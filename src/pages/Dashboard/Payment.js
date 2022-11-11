import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';



const stripePromise = loadStripe('pk_test_51L4mFqKQIqqGSKoDEJ0UxwGD4U0AUW5Q6BCQg7CRusz8eahiNd3fF1XXVNOhscOqWKWrHl8g19VxjACRA3MY0gwG00aHVyrIdK');


const Payment = () => {
    const { id } = useParams();
    const url = `http://localhost:5000/booking/${id}`;

    const { data: appointment, isLoading } = useQuery(['booking', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))


    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>

            <div className="card w-50 max-w-md bg-base-100 shadow-xl my-12">
                <div className="card-body">
                    <p className='text-success font-bold'>Hello, {appointment.patientName}</p>
                    <h2 className="card-title">Please Pay for {appointment.treatment}</h2>
                    <p>Your Appointment <span className='text-orange-700'>{appointment.date}</span> at {appointment.slot}</p>
                    <p className='font-bold'>Please pay: ${appointment.price}</p>
                </div>
            </div>
            <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm appointment = {appointment} />
                    </Elements>

                </div>
            </div>
        </div>

    );
};

export default Payment;