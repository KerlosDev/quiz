import QuizBio from "@/app/components/QuizBio"
import QuizCh from "@/app/components/QuizCh"
import QuizData from "@/app/components/QuizData"
import QuizPh from "@/app/components/QuizPh"
import { PremiumUserProvider } from "@/app/context/PremiumUserContext"
import React from "react"


const page = ({ params }) => {


  return (
   
    
    <PremiumUserProvider>

      <QuizBio  params={params}></QuizBio>

    </PremiumUserProvider>
    
  )
}

export default page