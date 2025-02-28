import QuizCh from "@/app/components/QuizCh"
import { PremiumUserProvider } from "@/app/context/PremiumUserContext"

import React from "react"


const page = ({ params }) => {


  return (

    <PremiumUserProvider>

      <QuizCh params={params}></QuizCh>

    </PremiumUserProvider>


  )
}

export default page