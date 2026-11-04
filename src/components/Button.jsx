function Button(props) {
  let buttonClass = "bg-violet-600 hover:bg-violet-700 text-white";

  if (props.color === "green") {
    buttonClass = "bg-green-600 hover:bg-green-700 text-white";
  }
  if (props.color === "gray") {
    buttonClass = "bg-slate-500 hover:bg-slate-600 text-white";
  }
  if (props.color === "dark") {
    buttonClass = "bg-slate-800 hover:bg-slate-700 text-white";
  }
  if (props.color === "white") {
    buttonClass = "bg-white text-violet-700 hover:bg-violet-100";
  }

  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={
        "px-6 py-2.5 rounded-lg font-semibold shadow-md transition " +
        buttonClass
      }
    >
      {props.children}
    </button>
  );
}

export default Button;
