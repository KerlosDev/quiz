
import React from 'react'
import Chem from '../components/Chem';
import { PremiumUserProvider } from '../context/PremiumUserContext';



export const metadata = {
    title: " امتحانات كيمياء | كويزاتك ",
    description: " امتحانات كيمياء كتير  مع اسئلة متعددة الصعوبة تخيلك تضمن امتحان اخر السنه ان شا الله ",
};


const page = () => {

   


    return (


        <PremiumUserProvider>

            <Chem></Chem>

        </PremiumUserProvider>

    )
}

export default page