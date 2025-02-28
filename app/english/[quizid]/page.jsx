import QuizBio from "@/app/components/QuizBio"
import QuizCh from "@/app/components/QuizCh"
import QuizData from "@/app/components/QuizData"
import QuizEn from "@/app/components/QuizEn"
import QuizPh from "@/app/components/QuizPh"
import { PremiumUserProvider } from "@/app/context/PremiumUserContext"
import React from "react"


const page = ({ params }) => {


  return (
   
    <PremiumUserProvider>

      <QuizEn params={params}></QuizEn>

    </PremiumUserProvider>
    
  
  )
}

export default page