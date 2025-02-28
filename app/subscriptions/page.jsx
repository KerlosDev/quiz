import React from "react"

import Subs from '../components/Subs'
import { PremiumUserProvider } from "../context/PremiumUserContext"


const page = () => {
  
    return (
        <>
            <PremiumUserProvider>

            <Subs></Subs>

            </PremiumUserProvider>
        </>
    )
}

export default page