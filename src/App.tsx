import "./styles.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

interface UserName {
  first: string;
  last: string;
  title: string;
  gender: string;
}
interface UserPicture {
  thumbnail: string;
}
interface UserInfo {
  name: UserName;
  picture: UserPicture;
}

const randomApi = "https://randomuser.me/api";
const fetchRandomApi = (pageNumber: number) => {
  return axios
    .get(`${randomApi}?page=${pageNumber}`)
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
};
const getFullUserName = (userInfo: UserInfo) => {
  const {
    name: { first, last, title }
  } = userInfo;
  const { gender } = userInfo;

  return `${title} ${first} ${last} is a ${gender}`;
};

export default function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState("");
  const [nextPageNumber, setNextPageNumber] = useState(1);
  const [usersInfo, setUsersInfo] = useState([]);

  const fetchNextUser = () => {
    fetchRandomApi(nextPageNumber).then((randomData) => {
      // setData(JSON.stringify(randomData, null, 2) || "no data found");
      if (randomData === undefined) return;
      const newUserInfos = [...usersInfo, ...randomData.results];
      setUsersInfo(newUserInfos);
      setNextPageNumber(randomData.info.page + 1);
    });
  };

  useEffect(() => {
    fetchNextUser();
  }, []);
  return (
    <div className="App">
      <h1>React Coding Challenges</h1>
      <h3>{count} </h3>
      <button onClick={() => setCount(count + 1)}>Counter</button>
      <button onClick={() => fetchNextUser()}>Fetch next user</button>
      {usersInfo.map((userInfo: UserName, idx: number) => (
        <>
          <p>{getFullUserName(userInfo)} </p>
          <img src={userInfo.picture.thumbnail} />
        </>
      ))}
      <pre>{data}</pre>
    </div>
  );
}
