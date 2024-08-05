import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useSearchUser from "../hooks/useSearchUser";
import { FaRegEdit } from "react-icons/fa";
import EditProfile from "./EditProfile";

function SearchUser() {
  const [search, setSearch] = useState("");
  const { searchUser } = useSearchUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.length < 1) return;
    searchUser(search);
  };
  return (
    <div className="flex gap-2">
      <div className="drawer drawer-start w-max">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer-4" className="drawer-button btn btn-link">
            <FaRegEdit />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <EditProfile />
          </ul>
        </div>
      </div>
      <form
        className="flex justify-between items-center gap-3"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full max-w-xs rounded-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="p-2 rounded-full bg-slate-200 text-black cursor-pointer">
          <FaSearch />
        </button>
      </form>
    </div>
  );
}
export default SearchUser;
