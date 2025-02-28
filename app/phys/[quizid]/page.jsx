import QuizData from "@/app/components/QuizData"
import QuizPh from "@/app/components/QuizPh"
import { PremiumUserProvider } from "@/app/context/PremiumUserContext"
import React from "react"


const page = ({ params }) => {


  return (
    
    <PremiumUserProvider>

      <QuizPh params={params}></QuizPh>

    </PremiumUserProvider>
    
  )
}

export default page