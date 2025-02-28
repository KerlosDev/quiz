import QuizData from "@/app/components/QuizData"
import QuizFr from "@/app/components/QuizFr"
import QuizGeo from "@/app/components/QuizGeo"
import { PremiumUserProvider } from "@/app/context/PremiumUserContext"
import React from "react"


const page = ({ params }) => {


  return (
    <PremiumUserProvider>

      <QuizGeo params={params}></QuizGeo>

    </PremiumUserProvider>
    
  )
}

export default page