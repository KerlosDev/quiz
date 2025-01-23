import { GraphQLClient, gql } from "graphql-request";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userEmail, phonenumber } = req.body;

  console.log("Received request with:", { userEmail, phonenumber });

  const query = gql`
    mutation MyMutation {
      createUserEnroll(
        data: { phonenumber: "${phonenumber}", isHePaid: false, userEmail: "${userEmail}" }
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

  const client = new GraphQLClient(process.env.NEXT_PUBLIC_MASTER_URL_MAIN_API, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_API_TOKEN}`,
    },
  });

  try {
    const result = await client.request(query);
    console.log("GraphQL request successful:", result);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error sending enroll data:", error);
    return res.status(500).json({ message: "Failed to send enroll data" });
  }
};

export default handler;
