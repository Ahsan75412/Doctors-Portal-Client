import React from 'react';
import doctor from  '../../assets/images/doctor.png';
import appointment from  '../../assets/images/appointment.png';
import PrimaryButton from '../Shared/PrimaryButton';

const MakeAppoinment = () => {
    return (
        <section style={{
            background: `url(${appointment})`
        }} 
        className='flex justify-center items-center'>
            <div className='flex-1 hidden lg:block'>
                <img className='mt-[-100px]' src={doctor} alt="Doctor Loading.." />
            
            </div>

            <div className='flex-1 p-5'>
                <h3 className='text-xl text-primary font-bold'>Appoinment</h3>
                <h2 className='text-3xl text-white'>Make an Appoinment Today</h2>
                <p className='text-white py-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas eum unde totam deserunt? Quos placeat nulla voluptate perferendis tempora dolor quam, obcaecati quibusdam enim facere aspernatur, voluptas fugit? Nemo, nulla. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa architecto praesentium saepe est animi fugit quasi cumque! Unde, ad fugiat! </p>
                
                <PrimaryButton >get Started</PrimaryButton>
            </div>

            

        </section>
      
    );
};

export default MakeAppoinment;