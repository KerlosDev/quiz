import React from 'react'
import Physics from '../components/Physics'
import { PremiumUserProvider } from '../context/PremiumUserContext';


export const metadata = {
    title: " امتحانات فيزياء | كويزاتك ",
    description: " امتحانات فيزياء كتير  مع اسئلة متعددة الصعوبة تخيلك تضمن امتحان اخر السنه ان شا الله ",
};

const page = () => {
    return (


        <PremiumUserProvider>

         
            <Physics></Physics>


        </PremiumUserProvider>

    )
}

export default page