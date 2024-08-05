import SearchUser from "../../components/SearchUser";
import Conversations from "./Conversations";
import LogoutButton from "../../components/LogoutButton";

function Sidebar() {
  return (
    <div className="border-r flex flex-col border-slate-500 p-3 min-w-[300px]">
      <SearchUser />
      <Conversations />
      <LogoutButton />
    </div>
  );
}
export default Sidebar;
