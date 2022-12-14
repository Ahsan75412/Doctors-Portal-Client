import React from 'react';
import Banner from './Banner';
import Contact from './Contact';
import Footer from '../Shared/Footer';
import Info from './Info';
import MakeAppoinment from './MakeAppoinment';
import Services from './Services';
import TeethCheck from './TeethCheck';
import Testimonials from './Testimonials';

const Home = () => {
    return (
        <div >
           <Banner></Banner>
           <Info></Info>
           <Services></Services>
           <TeethCheck></TeethCheck>
           <MakeAppoinment></MakeAppoinment>
           <Testimonials></Testimonials>
           <Contact></Contact>
           <Footer></Footer>
        </div>
    );
};

export default Home;