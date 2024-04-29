import {motion} from "framer-motion"

const Chatlist = ({ item ,setWhatpjt}) => {

  return (
    <>
      {" "}
      <motion.div
        onClick={()=>setWhatpjt(item)}
        whileHover={{ cursor: "pointer", backgroundColor: "white" }}
        style={{
          position: "relative",
          padding: "1rem",
          display: "flex",
          gap: "1rem",
          height: "5.5rem",
          alignItems: "center",
          borderRadius: "1rem",
        }}
      >
        <img style={{ width: "3rem", height: "3rem" }} src={item.projectimg} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <div>
            <h5 style={{ fontSize: "0.9rem", margin: 0 }}>{item.projectname}</h5>
            <div></div>
          </div>
          <h5 style={{ fontSize: "0.9rem", margin: 0 }}>{item.lastChat}</h5>
        </div>
        <div
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            fontSize: "0.7rem",
            opacity: 0.5,
          }}
        >
          {item.day}
        </div>
      </motion.div>
    </>
  );
};
export default Chatlist;
