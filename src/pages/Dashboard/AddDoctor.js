import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit ,reset } = useForm();

    const { data: services, isLoading } = useQuery('services', () => fetch('https://doctors-appoinments.onrender.com/service').then(res => res.json()))

    const imageStorageKey = '94036c6bdb1eb4bb61e325de52d9daec';

    /**
     * 3 ways to store images 
     * 1 => Third party storage //free open public storage in ok for practice project
     * 2 => Your own Storage in your on server ( file system)
     * 3 => database: mongodb
     * 
     * 
     * YUP: to validate file : search : YUP file validation for react hook form
     */





    const onSubmit = async data => {
        // console.log(data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                console.log('imgbb', result);
                if (result.success) {
                    const img = result.data.url;
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        img: img

                    }
                    // send to your database
                    fetch('https://doctors-appoinments.onrender.com/doctor',{
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })

                    .then(res => res.json())
                    .then(inserted => {
                        // console.log('doctor',inserted);
                        if(inserted.insertedId){
                            toast.success('Doctor Info added successfully')
                            reset();
                        }else{
                            toast.error('Failed To add doctor! please Try again..');
                        }
                    } )
                }
            })


    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='text-2xl'>Add a New Doctor</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* daisy ui control */}

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>

                    <input
                        type="text"
                        placeholder="Your Name"
                        className="input input-bordered w-full max-w-xs"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        })}
                    />

                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}



                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>

                    <input
                        type="email"
                        placeholder="Your Email..."
                        className="input input-bordered w-full max-w-xs"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is Required'
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Provide a valid Email'
                            }
                        })}
                    />

                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}

                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}

                    </label>
                </div>





                {/* password fields */}



                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select {...register("specialty")} className="select input-bordered w-full max-w-xs">
                        {
                            services.map(service => <option
                                key={service._id}
                                value={service.name}
                                service={service}
                            >{service.name}</option>)
                        }


                    </select>

                </div>





                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Images</span>
                    </label>

                    <input
                        type="file"
                        className="input input-bordered w-full max-w-xs"
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'image is Required'
                            }
                        })}
                    />

                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}



                    </label>
                </div>



                <input className='btn w-full max-w-xs text-white' type="submit" value="Add" />


            </form>
        </div>
    );
};

export default AddDoctor;