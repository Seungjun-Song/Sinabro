const day_list = [ "Today", "D+1", "D+2", "D+3","D+4","D+5","D+6","D+7"];
const Todo = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div>이번주 할것!</div>
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        {day_list.map((item) => (
          <div style={{ width: "14%", height: "100%", textAlign: "center" }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Todo;
