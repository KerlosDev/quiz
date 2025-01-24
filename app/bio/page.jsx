import React from 'react'
import Bio from '../components/Bio'
import { PremiumUserProvider } from '../context/PremiumUserContext';



export const metadata = {
    title: " امتحانات احياء  | كويزاتك ",
    description: " امتحانات احياء كتير  مع اسئلة متعددة الصعوبة تخيلك تضمن امتحان اخر السنه ان شا الله ",
};


const page = () => {
    return (

        <PremiumUserProvider>
            <Bio></Bio>
        </PremiumUserProvider>







    )
}

export default page