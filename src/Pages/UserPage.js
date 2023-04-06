import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import {useAuthState} from 'react-firebase-hooks/auth';
import { CircularProgress } from "@mui/material";
import ResultTable from "../Components/ResultTable";
import Graph from "../Components/Graph";
import UserCard from "../Components/UserCard";
const UserPage = () => {
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [user, loading] = useAuthState(auth);
  const [graphData, setGraphData] = useState([]);
  const fetchUserData = () => {
    const resultsRef = db.collection("Results");
    const { uid } = auth.currentUser;
    let tempData = [];
    let tempGraphData = [];
    resultsRef
      .where("userId", "==", uid)
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          tempData.push({...doc.data()});
          tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(',')[0], doc.data().wpm])
        });
        setData(tempData);
        setGraphData(tempGraphData.reverse());
        setDataLoading(false);
      });
  };

  useEffect(() => {
    if(!loading && user){
      fetchUserData();
    }
    
  }, [loading]);

  if(!loading && !user){
    return <div className="screen-center"><span>Login to view results</span></div>
  }

  if(loading || dataLoading){
    return <div className='screen-center'><CircularProgress size={300}/></div>
  }

  

  return (
    <div className="canvas">
      <UserCard totalTests={data.length}/>
      <div className="user-page-graph">
        <Graph graphData={graphData}/>
      </div>
      <ResultTable data={data}/>
    </div>
  );
};

export default UserPage;
