import Sidebar from "./Sidebar";
import MessagesContainer from "../../components/MessagesContainer";

function Home() {
  return (
    <div className="flex h-[600px] rounded overflow-hidden">
      <Sidebar />
      <MessagesContainer />
    </div>
  );
}
export default Home;
