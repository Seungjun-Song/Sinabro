import { motion } from "framer-motion";
const Projectexplanation = ({isDark}) => (
  <>
    <motion.h4
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      style={{ fontWeight: "bold" , color:isDark ? "white" :"black",transition:"0.3s", }}
      transition={{duration:0.3}}

    >
      클라이머들을 위한 문제 업데이트 알림 서비스
    </motion.h4>
    <motion.h5
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      style={{ lineHeight: "3rem", margin: 0, color:isDark ? "white" :"black"  ,transition:"0.3s"}}
      transition={{delay:0.2 , duration:0.3}}

    >
      클라이밍 홀드를 GRAB하는 사람들의 모임, GRABBERS입니다!✊실제 클라이머
      팀원으로 구성된 저희 팀은, 직접 사용할 클라이밍 서비스를 만들겠다는
      열정으로 소셜미디어로 이루어지고 있는 기존의 암장 정보들을 하나의 서비스로
      정리하여 클라이머에게 제공하는 서비스를 제작하였습니다.🧗클라이밍을
      좋아하는 분, 관심을 갖고 계신 분들은 한 번씩 들러 주변의 암장들을 확인해
      보세요.
    </motion.h5>
  </>
);
export default Projectexplanation;
