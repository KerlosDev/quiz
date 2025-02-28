import React from 'react'
import French from '../components/French'
import { PremiumUserProvider } from '../context/PremiumUserContext';


export const metadata = {
    title: " امتحانات لغة فرنسية | كويزاتك ",
    description: " امتحانات لغة فرنسية كتير  مع اسئلة متعددة الصعوبة تخيلك تضمن امتحان اخر السنه ان شا الله ",
};


const page = () => {
    return (


        <div>

            <PremiumUserProvider>

                <French></French>

            </PremiumUserProvider>


        </div>

    )
}

export default page