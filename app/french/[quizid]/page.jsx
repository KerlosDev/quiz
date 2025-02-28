import QuizData from "@/app/components/QuizData"
import QuizFr from "@/app/components/QuizFr"
import QuizPh from "@/app/components/QuizPh"
import { PremiumUserProvider } from "@/app/context/PremiumUserContext"
import React from "react"


const page = ({ params }) => {


  return (
    <PremiumUserProvider>

      <QuizFr params={params}></QuizFr>

    </PremiumUserProvider>
    
    
  )
}

export default page