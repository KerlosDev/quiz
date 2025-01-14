import request, { gql } from "graphql-request"



const apiQuiz = process.env.NEXT_PUBLIC_MASTER_URL_QUIZ
const MAINAPI = process.env.NEXT_PUBLIC_MASTER_URL_MAIN_API
const apiph = process.env.NEXT_PUBLIC_MASTER_URL_PHYSICS
const apich = process.env.NEXT_PUBLIC_MASTER_URL_CHEM
const apibio = process.env.NEXT_PUBLIC_MASTER_URL_BIOLOGY
const apiar = process.env.NEXT_PUBLIC_MASTER_URL_ARABIC
const apien = process.env.NEXT_PUBLIC_MASTER_URL_ENGLISH
const apifr = process.env.NEXT_PUBLIC_MASTER_URL_FRENCH
const apigeo = process.env.NEXT_PUBLIC_MASTER_URL_GEO




const SaveGradesOfQuiz = async (subname, level, userEmail, uerName, userGrade, quizname, numofqus) => {
  const query6 = gql`
  
  mutation MyMutation {
  createQuizresult(
    data: { nameofsub: `+ subname + `, level: ` + level + `, userEmail: "` + userEmail + `", userName: "` + uerName + `", quizGrade: ` + userGrade + `,nameofquiz: "` + quizname + `",numofqus:` + numofqus + `}
  ) {
    id
  }

  
  
  publishManyQuizresultsConnection (first: 10000) {
    edges {
      node {
        id
      }
    }
  }
}
  `

  const reslut6 = await request(apiQuiz, query6)
  return reslut6
}
const vquiz = async (userEmail) => {
  const qmon = gql`
  
  
query MyQuery {
  quizresults(where: {userEmail: "`+ userEmail + `"}, last: 20) {
    id
    quizGrade
    userName
    nameofquiz
    numofqus
     nameofsub
    level
  }
}

  `

  const quizres = await request(apiQuiz, qmon)
  return quizres;
}





const sendEnrollData = async (userEmail, phonenumber) => {
  const query3 = gql`
  
  mutation MyMutation {

   createUserEnroll(
    data: {phonenumber: "`+ phonenumber + `", isHePaid: false, userEmail: "` + userEmail + `"}
  ) {
    id
    userEmail
  }

 
     publishManyUserEnrollsConnection(where: {}) {
    edges {
      node {
        id
      }
    }
  }
}
  
  `


  const result3 = await request(MAINAPI, query3)
  return result3
}

const premUsers = async (useremail) => {
  const query3 = gql`
  query MyQuery {
  userEnrolls(where: {isHePaid: true, userEmail: "`+ useremail + `"}) {
    id
    userEmail
    isHePaid
  }
}
  `


  const result3 = await request(MAINAPI, query3)
  return result3
}


const physicsData = async () => {
  const shite = gql`
  query MyQuery {
  dataOfQuizs(where: {subject: ph}) {
    level
    namequiz
    id
  }
}
  `

  const shitosd = await request(apiph, shite)
  return shitosd
}
const chemstryDAta = async () => {
  const shite = gql`
  
  
  query MyQuery {
  dataOfQuizs(where: {subject: chem}) {
    level
    namequiz
    id
  }
}

  `

  const shitosd = await request(apich, shite)
  return shitosd
}
const biologyDAta = async () => {
  const shite = gql`
   query MyQuery {
  dataOfQuizs(where: {subject: bio}) {
    level
    namequiz
    id
  }
}
  `

  const shitosd = await request(apibio, shite)
  return shitosd
}
const arabicData = async () => {
  const shite = gql`
 
  
  
  query MyQuery {
  dataOfQuizs(where: {subject: ar}) {
    level
    namequiz
    id
  }
}

  `

  const shitosd = await request(apiar, shite)
  return shitosd
}
const englishData = async () => {
  const shite = gql`
 
  
  
  query MyQuery {
  dataOfQuizs(where: {subject: en}) {
    level
    namequiz
    id
  }
}

  `

  const shitosd = await request(apien, shite)
  return shitosd
}
const frenchData = async () => {
  const shite = gql`
   query MyQuery {
  dataOfQuizs(where: {subject: fr}) {
    level
    namequiz
    id
  }
}
  `

  const shitosd = await request(apifr, shite)
  return shitosd
}
const geoData = async () => {
  const shite = gql`
   query MyQuery {
  dataOfQuizs(where: {subject: geo}) {
    level
    namequiz
    id
  }
}
  `

  const shitosd = await request(apigeo, shite)
  return shitosd
}


const quizPh = async (quizid) => {
  const shite = gql`
  query MyQuery {
  dataOfQuizs(where: {id: "`+ quizid + `"}) {
    level
    namequiz
    fileOfQus {
      url
    }
    subject
  }
}

  `

  const shitosd = await request(apiph, shite)
  return shitosd
}
const quizCh = async (quizid) => {
  const shite = gql`
  
  query MyQuery {
  dataOfQuizs(where: {id: "`+ quizid + `"}) {
    level
    namequiz
    fileOfQus {
      url
    }
    subject
    
  }
}

  `

  const shitosd = await request(apich, shite)
  return shitosd
}
const quizbio = async (quizid) => {
  const shite = gql`
  
  query MyQuery {
  dataOfQuizs(where: {id: "`+ quizid + `"}) {
    level
    namequiz
    fileOfQus {
      url
    }
    subject
  }
}

  `

  const shitosd = await request(apibio, shite)
  return shitosd
}
const quizAr = async (quizid) => {
  const shite = gql`
   query MyQuery {
  dataOfQuizs(where: {id: "`+ quizid + `"}) {
    level
    namequiz
    fileOfQus {
      url
    }
    subject
  }
}

  `

  const shitosd = await request(apiar, shite)
  return shitosd
}
const quizEn = async (quizid) => {
  const shite = gql`
   query MyQuery {
  dataOfQuizs(where: {id: "`+ quizid + `"}) {
    level
    namequiz
    fileOfQus {
      url
    }
    subject
  }
}
  `

  const shitosd = await request(apien, shite)
  return shitosd
}
const quizFr = async (quizid) => {
  const shite = gql`
  query MyQuery {
  dataOfQuizs(where: {id: "`+ quizid + `"}) {
    level
    namequiz
    fileOfQus {
      url
    }
    subject
  }
}

  `

  const shitosd = await request(apifr, shite)
  return shitosd
}
const quizgeo = async (quizid) => {
  const shite = gql`
   query MyQuery {
  dataOfQuizs(where: {id: "`+ quizid + `"}) {
    level
    namequiz
    fileOfQus {
      url
    }
    subject
  }
}

  `

  const shitosd = await request(apigeo, shite)
  return shitosd
}

const greatDay = async () => {
  const shite = gql`
  
  query MyQuery {
  quizresults(first: 1000) {
    quizGrade
    userName
    userEmail
  }
}

  `

  const shitosd = await request(apiQuiz, shite)
  return shitosd
}

const testapi = async () => {
  const shite = gql`
  
  query MyQuery {
  quiz(where: {id: "cm5vg6hnv03im07oa01gzgyhz"}) {
        quiztitle
         question (first: 100) {
      opationA
      opationC
      opationB
      opationD
      trueChoisevip
      qus
      
    }

         chooseBook
         subjectName
    
      }
}

  `

  const shitosd = await request(apien, shite)
  return shitosd
}


export default {
  testapi,
  greatDay,
  arabicData,
  geoData,
  englishData,
  frenchData,
  biologyDAta,
  quizEn,
  quizgeo,
  quizFr,
  quizAr,
  quizbio,
  quizCh,
  quizPh,
  physicsData,
  chemstryDAta,
  premUsers,
  SaveGradesOfQuiz,
  vquiz,
  sendEnrollData,
  


}