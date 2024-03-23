import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../firebaseConfig";
import Graph from "./Graph";
import { Button } from "@mui/icons-material";

const Stats = ({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  missedChars,
  extraChars,
  graphData,
  resetTest,
}) => {
  // arr = [1,1,2,3,4,5,6,6,6,6] = set(arr) => [1,2,3,4,5,6]

  var timeSet = new Set();

  const newGraph = graphData.filter((i) => {
    if (!timeSet.has(i[0])) {
      timeSet.add(i[0]);
      return i;
    }
  });

  const pushToDb = () => {
    // reference to the 'results' collection
    const resultRef = db.collection("Results");

    // auth object has the details of the current user
    const { uid } = auth.currentUser;

    // case to handle when user has not typed even 1 word (in which case accuracy will be 0)
    if (isNaN(accuracy)) {
      toast.error("Invalid Test!", {
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    // add data to db in json format (key-value pairs)
    resultRef
      .add({
        wpm: wpm,
        accuracy: accuracy,
        characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
        timeStamp: new Date(),
        userId: uid,
      })
      .then((res) => {
        toast.success("Data pushed to db!", {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        toast.error("Unable to save data", {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  useEffect(() => {
    if (auth.currentUser) {
      pushToDb();
    } else {
      toast.warning("Login to save results", {
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, []);

  return (
    <div className="stats-box">
      <div className="left">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "30px",
            justifyContent: "space-between",
          }}
        >
          <div className="title">
            <div>WPM </div>
            <div>Accuracy</div>
            <div>Correct Characters</div>
            <div>Incorrect Characters</div>
            <div>Missed Characters</div>
          </div>
          <div className="subtitle">
            <div>{wpm}</div>
            <div>{accuracy}</div>
            <div>{correctChars}</div>
            <div>{incorrectChars}</div>
            <div>{missedChars}</div>
          </div>
        </div>
        <div onClick={resetTest} className="restart">
          RESTART
        </div>
      </div>
      <div className="right">
        {/* graph will come here */}
        <Graph graphData={newGraph} />
      </div>
    </div>
  );
};

export default Stats;
