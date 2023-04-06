import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../firebaseConfig";
import Graph from "./Graph";

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
    const resultRef = db.collection("Results");
    const { uid } = auth.currentUser;
    if (isNaN(accuracy)) {
      toast.error("Invalid Test", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    resultRef
      .add({
        wpm: wpm,
        accuracy: accuracy,
        characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
        timeStamp: new Date(),
        userId: uid,
      })
      .then((res) => {
        toast.success("Data pushed to db", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        toast.error("not able to add data", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
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
      toast.warning("login to save result", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
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
        <div className="title">WPM</div>
        <div className="subtitle">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">{accuracy}</div>
        <div className="title">Characters</div>
        <div className="subtitle">
          {correctChars}/{incorrectChars}/{missedChars}/{extraChars}
        </div>
        <div onClick={resetTest} className="restart">
          Restart
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
