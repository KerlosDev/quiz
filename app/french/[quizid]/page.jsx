import QuizData from "@/app/components/QuizData"
import QuizFr from "@/app/components/QuizFr"
import QuizPh from "@/app/components/QuizPh"
import React from "react"


const page = ({ params }) => {


  return (
    
    <QuizFr params={params}></QuizFr>
    
  )
}

export default page