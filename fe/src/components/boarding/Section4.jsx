import "./styles.css";
import { motion } from "framer-motion";
const food = [
  ["/images/ava_choi.png", 340, 10, "최재성", "FrontEnd", "수고하셨습니다"],
  //   ["🍊", 20, 40],
  ["/images/ava_park2.png", 60, 90, "박주헌", "FrontEnd", "재밌었습니다"],
  //   ["🍐", 80, 120],
  ["/images/ava_jeon.png", 100, 140, "전은희", "FrontEnd", "만족합니다"],
  ["/images/ava_kim.png", 205, 245, "김윤민", "BackEnd", "반가웠습니다"],
  ["/images/ava_song.png", 260, 290, "송승준", "BackEnd", "기쁩니다"],
  ["/images/ava_park1.png", 290, 320, "박종국", "BackEnd", "수고하셨습니다"],
];

const Section4 = () => {
  return (
    <>
      <div
        style={{
          width: "95%",
          height: "100vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          flexWrap: "wrap",
        }}
      >
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          style={{
            position: "absolute",
            top: "10%",
            left: "90%",
            filter: "blur(100px)",
            width: "10rem",
            height: "10rem",

            backgroundColor: "#bb19d4",
          }}
        ></motion.div>
              <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            filter: "blur(100px)",
            width: "15rem",
            height: "15rem",

            backgroundColor: "#198fd4",
          }}
        ></motion.div>
         <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            filter: "blur(100px)",
            width: "15rem",
            height: "15rem",

            backgroundColor: "#4519d4",
          }}
        ></motion.div>
        {food.map(([emoji, hueA, hueB, name, job, comment]) => (
          <Card
            emoji={emoji}
            hueA={hueA}
            hueB={hueB}
            name={name}
            job={job}
            comment={comment}
            key={emoji}
          />
        ))}
      </div>
    </>
  );
};
const hue = (h) => `hsl(${h}, 100%, 50%)`;
const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};
function Card({ emoji, hueA, hueB, name, job, comment }) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      className="card-container col-4"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <div className="splash" style={{ background }} />
      <motion.div className="card" variants={cardVariants}>
        <img style={{ width: "9rem" }} src={emoji} />
        <h5>{name}</h5>
        <h5>{job}</h5>
        <h5>{comment}</h5>
      </motion.div>
    </motion.div>
  );
}
export default Section4;
