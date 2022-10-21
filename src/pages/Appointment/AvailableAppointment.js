import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

const AvailableAppointment = ({date}) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('services.json')
        .then(res => res.json())
        .then(data => setServices(data));
    },[])
    return (
        <div>
            <h4 className='text-xl text-secondary text-center'>Available Appointments on  {format(date,'PP')}</h4>

            <div>
                
            </div>
            
            
        </div>
    );
};

export default AvailableAppointment;