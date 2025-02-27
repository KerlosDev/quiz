import request, { gql, GraphQLClient } from "graphql-request"



const apiQuiz = process.env.NEXT_PUBLIC_MASTER_URL_QUIZ
const MAINAPI = process.env.NEXT_PUBLIC_MASTER_URL_MAIN_API
const apiph = process.env.NEXT_PUBLIC_MASTER_URL_PHYSICS
const apich = process.env.NEXT_PUBLIC_MASTER_URL_CHEM
const apibio = process.env.NEXT_PUBLIC_MASTER_URL_BIOLOGY
const apiar = process.env.NEXT_PUBLIC_MASTER_URL_ARABIC
const apien = process.env.NEXT_PUBLIC_MASTER_URL_ENGLISH
const apifr = process.env.NEXT_PUBLIC_MASTER_URL_FRENCH
const apigeo = process.env.NEXT_PUBLIC_MASTER_URL_GEO
const premusers = process.env.NEXT_PUBLIC_MASTER_URL_PREMUSERS
const token = process.env.NEXT_PUBLIC_HYGRAPH_API_TOKEN
const codes = "https://ap-south-1.cdn.hygraph.com/content/cm6yhh1kz01x307uqs702lnc0/master"

const testSaveQuizres = async (jsondata) => {
  // Fetch current results
  const fetchQuery = gql`
  query GetTestre {
    testre(where: {id: "cm687hnaj088507pjvo4cjkb4"}) {
      jsonres
    }
  }`;

  const currentResults = await request(apiQuiz, fetchQuery);

  let existingResults = currentResults.testre?.jsonres;

  // Ensure existingResults is an array
  if (!Array.isArray(existingResults)) {
    existingResults = [];
  }

  // Append new result
  const updatedResults = [...existingResults, jsondata];

  // Update results
  const updateQuery = gql`
  mutation MyMutation($jsonres: Json!) {
    updateTestre(
      data: {jsonres: $jsonres}
      where: {id: "cm687hnaj088507pjvo4cjkb4"}
    ) {
      id
    }

    publishManyTestresConnection {
      edges {
        node {
          id
        }
      }
    }
  }`;

  const variables = {
    jsonres: updatedResults
  };

  const reslut6 = await request(apiQuiz, updateQuery, variables);
  return reslut6;
}


const codegen = async (jsondata) => {
  const fetchQuery = gql`
    query MyQuery {
      codetests(where: { id: "cm6zrfl772wen07o6pt57vmuq" }) {
        jsonres
      }
    }
  `;

  const currentResults = await request(codes, fetchQuery);
  let existingResults = currentResults.codetests[0]?.jsonres || [];

  // Ensure existingResults is an array
  if (!Array.isArray(existingResults)) {
    existingResults = [];
  }

  // Check if an entry with the same email already exists
  const hasEmail = existingResults.some(entry => entry.email === jsondata.email);

  if (hasEmail) {
    return; // If email already exists, do not update
  }

  // Append new code
  const updatedResults = [...existingResults, jsondata];

  // Update results
  const updateQuery = gql`
    mutation MyMutation($jsonres: Json!) {
      updateCodetest(data: { jsonres: $jsonres }, where: { id: "cm6zrfl772wen07o6pt57vmuq" }) {
        id
      }
      publishManyCodetestsConnection {
        edges {
          node {
            id
          }
        }
      }
    }
  `;

  const variables = {
    jsonres: updatedResults
  };

  const result6 = await request(codes, updateQuery, variables);
  return result6;
};

const codegen2 = async (jsondata) => {
  const fetchQuery = gql`
    query MyQuery {
      codetests(where: { id: "cm6zrfl772wen07o6pt57vmuq" }) {
        jsonres2
      }
    }
  `;

  const currentResults = await request(codes, fetchQuery);
  let existingResults = currentResults.codetests[0]?.jsonres2 || [];

  // Ensure existingResults is an array
  if (!Array.isArray(existingResults)) {
    existingResults = [];
  }

  // Check if an entry with the same email already exists
  const hasEmail = existingResults.some(entry => entry.email === jsondata.email);

  if (hasEmail) {
    return; // If email already exists, do not update
  }

  // Append new code
  const updatedResults = [...existingResults, jsondata];

  // Update results
  const updateQuery = gql`
    mutation MyMutation($jsonres2: Json!) {
      updateCodetest(data: { jsonres2: $jsonres2 }, where: { id: "cm6zrfl772wen07o6pt57vmuq" }) {
        id
      }
      publishManyCodetestsConnection {
        edges {
          node {
            id
          }
        }
      }
    }
  `;

  const variables = {
    jsonres2: updatedResults
  };

  const result6 = await request(codes, updateQuery, variables);
  return result6;
};

const invetedPeople = async () => {
  const fetchQuery = gql`
  query MyQuery {
    codetests(where: { id: "cm6zrfl772wen07o6pt57vmuq" }) {
      jsonres2
    }
  }
`;

  const currentResults = await request(codes, fetchQuery);
  return currentResults
}



const vquiz = async () => {
  const qmon = gql`
  query MyQuery {
  testres(first: 10000) {
    jsonres
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
      data: {phonenumber: "${phonenumber}", isHePaid: false, userEmail: "${userEmail}"}
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
  `;

  const client = new GraphQLClient(MAINAPI, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  try {
    const result3 = await client.request(query3);
    return result3;
  } catch (error) {
    console.error("Error sending enroll data:", error);
    throw new Error("Failed to send enroll data");
  }
}

const premUsers = async (useremail) => {
  const query3 = gql`
  query MyQuery {
  premiumUsersReqs(where: {isHePaid: true, userEmail: "`+ useremail + `"}) {
    id
    userEmail
    isHePaid
  }
}
  `


  const result3 = await request(premusers, query3)
  return result3
}


const physicsData = async () => {
  const shite = gql`
  query MyQuery {
  dataOfQuizs( first: 1000 where: {subject: ph}) {
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
  dataOfQuizs( first: 1000 where: {subject: chem}) {
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
  dataOfQuizs( first: 1000 where: {subject: bio}) {
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
  dataOfQuizs( first: 1000 where: {subject: ar}) {
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
  dataOfQuizs( first: 1000 where: {subject: en}) {
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
  dataOfQuizs( first: 1000 where: {subject: fr}) {
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
  dataOfQuizs( first: 1000  where: {subject: geo}) {
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

const dataToAdmin = async () => {
  const fetchQuery = gql`
  query MyQuery {
    codetests(where: { id: "cm6zrfl772wen07o6pt57vmuq" }) {
      jsonres2
      jsonres
      
    }
  }
`;

  const currentResults = await request(codes, fetchQuery);
  return currentResults
}



const timetabledata = async () => {
  const fetchQuery = gql`
 
  query MyQuery {
  timetablejsons {
    timetable
  }
}


`
    
    ;

  const currentResults = await request(apiQuiz, fetchQuery);
  return currentResults
}



export default {
  timetabledata,
  dataToAdmin,
  arabicData,
  englishData,
  frenchData,
  biologyDAta,
  chemstryDAta,
  physicsData,
  geoData,
  codegen,
  codegen2,
  quizAr,
  quizEn,
  quizFr,
  quizCh,
  quizPh,
  quizbio,
  quizgeo,
  invetedPeople,
  greatDay,

  premUsers,
  vquiz,
  sendEnrollData,
  testSaveQuizres,
}