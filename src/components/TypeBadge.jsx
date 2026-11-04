function TypeBadge(props) {
  let badgeColor = "bg-violet-100 text-violet-700";

  if (props.type === "number") {
    badgeColor = "bg-amber-100 text-amber-700";
  }
  if (props.type === "email") {
    badgeColor = "bg-sky-100 text-sky-700";
  }
  if (props.type === "dropdown") {
    badgeColor = "bg-emerald-100 text-emerald-700";
  }
  if (props.type === "checkbox") {
    badgeColor = "bg-rose-100 text-rose-700";
  }

  return (
    <span className={"px-2.5 py-1 rounded-md font-medium " + badgeColor}>
      Type: {props.type}
    </span>
  );
}

export default TypeBadge;
