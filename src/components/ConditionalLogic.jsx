function ConditionalLogic(props) {
  return (
    <div className="ml-10 bg-violet-50 rounded-lg p-3">
      <p className="text-sm font-medium text-violet-800 mb-2">
        Conditional Logic
      </p>
      <div className="flex gap-2">
        <select
          value={props.field.conditionFieldId}
          onChange={function (e) {
            props.onChangeConditionFieldId(props.field.id, e.target.value);
          }}
          className="border border-slate-300 bg-white p-2 rounded-lg text-sm flex-1"
        >
          <option value="">Always show</option>
          {props.fields.map(function (f) {
            if (f.id !== props.field.id) {
              return (
                <option key={f.id} value={f.id}>
                  Show if: {f.label}
                </option>
              );
            }
            return null;
          })}
        </select>
        {props.field.conditionFieldId !== "" && (
          <input
            type="text"
            value={props.field.conditionValue}
            onChange={function (e) {
              props.onChangeConditionValue(props.field.id, e.target.value);
            }}
            placeholder="equals value"
            className="border border-slate-300 p-2 rounded-lg text-sm flex-1"
          />
        )}
      </div>
    </div>
  );
}
export default ConditionalLogic;
