function FormInput(props) {
  const field = props.field;
  const inputClass =
    "border border-slate-300 p-2.5 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-violet-500 w-full";

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-700">
        {field.label}
        {field.required === true && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      {field.type === "text" && (
        <input
          type="text"
          value={props.value || ""}
          onChange={function (e) {
            props.handleInputChange(field.id, e.target.value);
          }}
          className={inputClass}
        />
      )}

      {field.type === "email" && (
        <input
          type="email"
          value={props.value || ""}
          onChange={function (e) {
            props.handleInputChange(field.id, e.target.value);
          }}
          className={inputClass}
        />
      )}

      {field.type === "number" && (
        <input
          type="number"
          value={props.value || ""}
          onChange={function (e) {
            props.handleInputChange(field.id, e.target.value);
          }}
          className={inputClass}
        />
      )}

      {field.type === "dropdown" && (
        <select
          value={props.value || ""}
          onChange={function (e) {
            props.handleInputChange(field.id, e.target.value);
          }}
          className={inputClass}
        >
          <option value="">Select an option</option>
          {field.options.split(",").map(function (option) {
            const cleanOption = option.trim();
            if (cleanOption !== "") {
              return (
                <option key={cleanOption} value={cleanOption}>
                  {cleanOption}
                </option>
              );
            }
            return null;
          })}
        </select>
      )}

      {field.type === "checkbox" && (
        <div className="flex items-center gap-2 mt-1">
          <input
            type="checkbox"
            checked={props.value || false}
            onChange={function (e) {
              props.handleInputChange(field.id, e.target.checked);
            }}
            className="w-5 h-5 accent-violet-600"
          />
          <span className="text-sm text-slate-500">Check this box</span>
        </div>
      )}
    </div>
  );
}

export default FormInput;
