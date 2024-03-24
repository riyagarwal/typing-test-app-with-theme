import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserCard = ({ totalTests }) => {
  const [user] = useAuthState(auth);

  let joinDate = new Date(user.metadata.creationTime);
  const year = joinDate.getFullYear();
  const month = joinDate.toLocaleString("default", { month: "short" });
  const date = joinDate.getDate();

  return (
    <div className="user-info">
      <div className="user">
        <div className="picture">
          <AccountCircleIcon
            style={{
              display: "block",
              transform: "scale(5)",
              margin: "auto",
            }}
          />
        </div>
        <div className="info">
          <div className="email" style={{ marginBottom: "10px" }}>
            {user.email}
          </div>
          <div className="joined-at">
            Joined on {date} {month} {year}
          </div>
        </div>
      </div>
      <div className="total-tests-taken">
        <span>Total Tests Taken - {totalTests}</span>
      </div>
    </div>
  );
};

export default UserCard;

// metadata has last sign in time, creation time
