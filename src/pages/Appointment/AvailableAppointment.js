import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from './BookingModal';
import Service from './Service';

const AvailableAppointment = ({date}) => {
    const [services, setServices] = useState([]);
    const [treatment , setTreatement] = useState(null);

    useEffect(() => {
        fetch('services.json')
        .then(res => res.json())
        .then(data => setServices(data));
    },[])
    return (
        <div>
            <h4 className='text-xl text-secondary text-center'>Available Appointments on  {format(date,'PP')}</h4>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    services.map(service =><Service
                        key={service._id}
                        service={service}
                        setTreatement = {setTreatement}
                    ></Service>)
                }
            </div>
            {treatment && <BookingModal 
            treatment={treatment}
            date = {date}
            setTreatement ={setTreatement}
            ></BookingModal>}
            
        </div>
    );
};

export default AvailableAppointment;