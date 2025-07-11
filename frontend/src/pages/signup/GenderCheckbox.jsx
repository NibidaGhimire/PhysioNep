const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex space-x-8 mt-4">
      <label
        className={`flex items-center cursor-pointer select-none space-x-2 p-2 rounded-md transition 
          ${
            selectedGender === "male"
              ? "bg-[var(--color-primary)] bg-opacity-30 text-[var(--color-primary)] font-semibold"
              : "text-gray-300 hover:bg-white hover:bg-opacity-10"
          }`}
      >
        <input
          type="radio"
          name="gender"
          className="form-radio text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
          checked={selectedGender === "male"}
          onChange={() => onCheckboxChange("male")}
        />
        <span>Male</span>
      </label>

      <label
        className={`flex items-center cursor-pointer select-none space-x-2 p-2 rounded-md transition 
          ${
            selectedGender === "female"
              ? "bg-[var(--color-primary)] bg-opacity-30 text-[var(--color-primary)] font-semibold"
              : "text-gray-300 hover:bg-white hover:bg-opacity-10"
          }`}
      >
        <input
          type="radio"
          name="gender"
          className="form-radio text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
          checked={selectedGender === "female"}
          onChange={() => onCheckboxChange("female")}
        />
        <span>Female</span>
      </label>
    </div>
  );
};

export default GenderCheckbox;
