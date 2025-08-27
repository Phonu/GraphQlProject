import "./App.css";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useState } from "react";

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

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      id
      age
      name
      isMarried
    }
  }
`;

function App() {
  const [newUser, setNewUser] = useState({});
  const {
    data: getUsersData,
    error: getUsersError,
    loading: getUsersLoading,
  } = useQuery(GETUSERS);
  const { data: getUserByIdData, loading: getUserByIdLoading } = useQuery(
    GET_USER_BY_ID,
    { variables: { id: "2" } }
  );

  const [createUser] = useMutation(CREATE_USER);

  const handleCreateUser = async () => {
    console.log("check the new User", newUser);
    createUser({
      variables: {
        name: newUser.name,
        age: Number(newUser.age),
        isMarried: false,
      },
    });
  };

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
        <input
          placeholder="Name..."
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        <input
          placeholder="Age..."
          type="number"
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, age: e.target.value }))
          }
        />

        <button onClick={handleCreateUser}> Create User</button>
      </div>
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
