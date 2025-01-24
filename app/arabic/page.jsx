import React from 'react'
import Arabic from '../components/Arabic'
import { PremiumUserProvider } from '../context/PremiumUserContext';

export const metadata = {
    title: " امتحانات لغة عربية | كويزاتك ",
    description: " امتحانات لغة عربية كتير  مع اسئلة متعددة الصعوبة تخيلك تضمن امتحان اخر السنه ان شا الله ",
};

const page = () => {

   
    
    return (


        <PremiumUserProvider>

            <Arabic></Arabic>

            
        </PremiumUserProvider>

    )
}

export default page