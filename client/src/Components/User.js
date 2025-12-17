import userimg from "../images/user.png";
import { useSelector } from "react-redux";

const User = () => {
  const {user} = useSelector(state=> state.users) 
  return (
    <div>
      <img src={userimg} className="userImage" alt=""/>
      <div>
        <h5>{user?.name}</h5>
        <h5>{user?.email}</h5>
      </div>
    </div>
  );
};

export default User;
