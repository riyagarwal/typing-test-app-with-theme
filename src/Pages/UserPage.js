import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { CircularProgress } from "@mui/material";
import ResultTable from "../Components/ResultTable";
import Graph from "../Components/Graph";
import UserCard from "../Components/UserCard";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [user, loading] = useAuthState(auth);
  // loading - A `boolean` to indicate whether the authentication state is still being loaded
  const [graphData, setGraphData] = useState([]);

  const fetchUserData = () => {
    // create a reference to the 'results' collection in firestore database
    const resultsRef = db.collection("Results");
    const { uid } = auth.currentUser;
    let tempData = [];
    let tempGraphData = [];
    resultsRef
      .where("userId", "==", uid) // fetch documents of only the logged in user
      .orderBy("timeStamp", "desc") //show latest data at the top
      .get() //returns a promise that resolves with a snapshot of the matching documents
      .then((snapshot) => { //processing the snapshot
        snapshot.docs.forEach((doc) => {
          // storing data in tempData variable instead of the state directly
          // to avoid rendering the page multiple times
          tempData.push({ ...doc.data() }); //pushes a copy of the document data into the array
          tempGraphData.push([
            // extract timeStamp and wpm from each 'doc'
            doc.data().timeStamp.toDate().toLocaleString().split(",")[0], //spltting to remove the time
            doc.data().wpm,
          ]);
        });
        // the snapshot has a key called docs containing the documents.
        // Each document has a method called "data" which when invoked provides the required result

        setData(tempData);
        setGraphData(tempGraphData.reverse()); //reversing to have the dates increase in x-axis
        setDataLoading(false);
      });
  };

  useEffect(() => {
    // only when firebase has loaded (connection established with google cloud)
    if (!loading && user) {
      fetchUserData();
    }
  }, [loading]);

  if (!loading && !user) {
    return (
      <div className="screen-center">
        <span>Login to view results</span>
      </div>
    );
  }

  if (loading || dataLoading) {
    return (
      <div className="screen-center">
        <CircularProgress size={300} />
      </div>
    );
  }

  return (
    <div className="canvas">
      <UserCard totalTests={data.length} />
      <div className="user-page-graph">
        <Graph graphData={graphData} />
      </div>
      <ResultTable data={data} />
    </div>
  );
};

export default UserPage;

// firebase is in a loading state when this page loads
