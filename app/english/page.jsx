import React from 'react'
import English from '../components/English'
import { PremiumUserProvider } from '../context/PremiumUserContext';


export const metadata = {
    title: " امتحانات لغة انجليزية | كويزاتك ",
    description: " امتحانات لغة انجليزية كتير  مع اسئلة متعددة الصعوبة تخيلك تضمن امتحان اخر السنه ان شا الله ",
};


const page = () => {
    return (
        <PremiumUserProvider>

            <div>
                <English></English>

            </div>
        </PremiumUserProvider>




    )
}

export default page