function SelectGender({ selectGender, changeGender }) {
  return (
    <div className="flex gap-3 items-center">
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text mr-3">Male</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={selectGender === "male"}
            onChange={() => changeGender("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text mr-3">Female</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={selectGender === "female"}
            onChange={() => changeGender("female")}
          />
        </label>
      </div>
    </div>
  );
}
export default SelectGender;
