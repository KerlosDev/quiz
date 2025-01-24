import React from 'react'
import Geo from '../components/Geo'
import { PremiumUserProvider } from '../context/PremiumUserContext';


export const metadata = {
    title: " امتحانات جيولوجيا | كويزاتك ",
    description: " امتحانات جيولوجيا كتير  مع اسئلة متعددة الصعوبة تخيلك تضمن امتحان اخر السنه ان شا الله ",
};


const page = () => {
    return (

        <PremiumUserProvider>

            <Geo></Geo>

        </PremiumUserProvider>




    )
}

export default page