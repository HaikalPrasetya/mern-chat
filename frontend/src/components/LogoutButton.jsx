import { MdLogout } from "react-icons/md";
import useLogout from "../hooks/useLogout";

function LogoutButton() {
  const { loading, logout } = useLogout();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <button onClick={handleLogout} disabled={loading}>
      <MdLogout size={25} />
    </button>
  );
}
export default LogoutButton;
