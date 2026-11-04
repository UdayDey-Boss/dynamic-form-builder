import TypeBadge from "./TypeBadge";
import ConditionalLogic from "./ConditionalLogic";

function FieldCard(props) {
  const field = props.field;

  let borderColor = "border-l-violet-500";
  if (field.type === "number") {
    borderColor = "border-l-amber-500";
  }
  if (field.type === "email") {
    borderColor = "border-l-sky-500";
  }
  if (field.type === "dropdown") {
    borderColor = "border-l-emerald-500";
  }
  if (field.type === "checkbox") {
    borderColor = "border-l-rose-500";
  }

  const inputClass =
    "border border-slate-300 p-2 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-violet-500";

  return (
    <div
      className={
        "bg-white border border-violet-100 border-l-4 p-4 mb-3 rounded-lg shadow-md hover:shadow-lg transition flex flex-col gap-3 " +
        borderColor
      }
    >
      <div className="flex items-center gap-3">
        <span className="drag-handle cursor-grab text-violet-300 font-bold px-1 text-2xl select-none">
          ⋮⋮
        </span>
        <input
          type="text"
          value={field.label}
          onChange={function (e) {
            props.onChangeLabel(field.id, e.target.value);
          }}
          className={inputClass}
        />
        <button
          onClick={function () {
            props.onDelete(field.id);
          }}
          className="bg-red-50 hover:bg-red-100 text-red-500 px-3 py-2 rounded-lg text-sm"
        >
          🗑 Delete
        </button>
      </div>

      {field.type === "dropdown" && (
        <div className="ml-10">
          <p className="text-sm text-slate-500 mb-1">
            Options (comma separated)
          </p>
          <input
            type="text"
            value={field.options}
            onChange={function (e) {
              props.onChangeOptions(field.id, e.target.value);
            }}
            className={inputClass}
          />
        </div>
      )}

      {field.type === "text" && (
        <div className="ml-10">
          <p className="text-sm text-slate-500 mb-1">
            Regex Validation (optional)
          </p>
          <input
            type="text"
            value={field.regex}
            onChange={function (e) {
              props.onChangeRegex(field.id, e.target.value);
            }}
            placeholder="e.g. ^[0-9]+$"
            className={inputClass}
          />
        </div>
      )}

      {field.type === "number" && (
        <div className="ml-10">
          <p className="text-sm text-slate-500 mb-1">
            Regex Validation (optional)
          </p>
          <input
            type="text"
            value={field.regex}
            onChange={function (e) {
              props.onChangeRegex(field.id, e.target.value);
            }}
            placeholder="e.g. ^[0-9]+$"
            className={inputClass}
          />
        </div>
      )}

      <ConditionalLogic
        field={field}
        fields={props.fields}
        onChangeConditionFieldId={props.onChangeConditionFieldId}
        onChangeConditionValue={props.onChangeConditionValue}
      />

      <div className="flex items-center gap-4 ml-10 text-sm bg-slate-50 p-2 rounded-lg">
        <TypeBadge type={field.type} />

        <select
          value={field.step}
          onChange={function (e) {
            props.onChangeStep(field.id, e.target.value);
          }}
          className="border border-slate-300 p-1 rounded-md text-sm bg-white"
        >
          <option value="1">Step 1</option>
          <option value="2">Step 2</option>
          <option value="3">Step 3</option>
        </select>

        <label className="flex items-center gap-2 cursor-pointer text-slate-600">
          <input
            type="checkbox"
            checked={field.required}
            onChange={function (e) {
              props.onChangeRequired(field.id, e.target.checked);
            }}
            className="w-4 h-4 accent-violet-600"
          />
          Required field
        </label>
      </div>
    </div>
  );
}

export default FieldCard;
