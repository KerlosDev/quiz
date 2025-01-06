import QuizData from "@/app/components/QuizData"
import QuizFr from "@/app/components/QuizFr"
import QuizGeo from "@/app/components/QuizGeo"
import React from "react"


const page = ({ params }) => {


  return (
    
    <QuizGeo params={params}></QuizGeo>
    
  )
}

export default page