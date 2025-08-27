import "./App.css";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GETUSERS = gql`
  query GetUsers {
    getUsers {
      age
      name
      isMarried
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserByID($id: ID!) {
    getUserById(id: $id) {
      age
      name
      isMarried
    }
  }
`;

function App() {
  const {
    data: getUsersData,
    error: getUsersError,
    loading: getUsersLoading,
  } = useQuery(GETUSERS);
  const {
    data: getUserByIdData,
    // error: getUserByIdError,
    loading: getUserByIdLoading,
  } = useQuery(GET_USER_BY_ID, { variables: { id: "2" } });

  console.log("kunal::::", getUsersData);

  if (getUsersLoading) {
    return <h1> Still loading...</h1>;
  }

  if (getUsersError) {
    return <h1> Something went wrong</h1>;
  }

  return (
    <>
      <h1> Users </h1>
      <div>
        {getUserByIdLoading ? (
          <p>Loading User</p>
        ) : (
          <>
            <h3>Chosen User</h3>
            {getUserByIdData.getUserById.name}
            {getUserByIdData.getUserById.age}
          </>
        )}
      </div>
      <div>
        {getUsersData.getUsers.map((user, index) => (
          <div key={index.toString()}>
            <p>Name:: {user.name}</p>
            <p>Age:: {user.age}</p>
            <p>Person is Married? :: {user.isMarried ? "YES" : "NO"}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
