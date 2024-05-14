import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const tags_info = {
  "brain-overload": "there is too much to keep in your head at one time.",
  "bad-practice":
    "the code likely works as designed, but the way it was designed is widely recognized as being a bad idea.",
  cert: "relates to a rule in a CERT standard. There are currently three CERT standards: C, C++, and Java. Many of these rules are not language-specific, but are good programming practices. That's why you'll see this tag on non-C/C++, Java rules.",
  clumsy:
    "extra steps are used to accomplish something that could be done more clearly and concisely. (E.G. calling .toString() on a String).",
  confusing:
    "will take maintainers longer to understand than is really justified by what the code actually does.",
  convention:
    "coding convention, typically formatting, naming, whitespace, etc.",
  cwe: "relates to a rule in the Common Weakness Enumeration. For more on CWE and on security-related rules in general, see Security-related rules.",
  design: "there is something questionable about the design of the code.",
  "lock-in": "environment-specific features are used.",
  pitfall:
    "nothing is wrong yet, but something could go wrong in the future; a trap has been set for the next person, and they'll probably fall into it and screw up the code.",
  suspicious:
    "it's not guaranteed that this is a bug, but it suspiciously looks like a bug. At the very least, the code should be re-examined and likely refactored for clarity.",
  unpredictable:
    "the code may work fine under current conditions, but may fail erratically if conditions change.",
  unused: "unused code; for example, a private variable that is never used.",
  "user-experience":
    "there's nothing technically wrong with your code, but it may make some or all of your users hate you.",
};

const Tag = ({ item }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      style={{
        padding: "0.1rem 0.5rem",
        borderRadius: "0.5rem",
        // border: "solid 2px black",
        marginTop: "0.5rem",
        color: "#3E4357",
        border: "2px solid #312972",
        // border :"solid 2px #3E4357",
        backgroundColor: "white",
        fontSize: "0.9rem",
        position: "relative",
      }}
    >
      {item}
      <AnimatePresence>
        {isHover && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              top: 30,
              left: -15,
              height: "auto",
              width: "25rem",
              backgroundColor: "rgb(62, 67, 87)",
              padding: "1rem",
              zIndex: 1,
              color: "white",
              borderRadius: "1rem",
              fontSize: "0.9rem",
            }}
          >
            <div
              style={{
                borderBottom: "solid white 2px",
                paddingBottom: "1rem ",
              }}
            >
              {tags_info[item] ? tags_info[item] : "SonarQube에서 찾아보세요"}
            </div>
            <div style={{ paddingTop: "1rem" }}>
              <a
                style={{ padding: 0, margin: 0, color: "#4B56BB" }}
                href="https://docs.sonarsource.com/sonarqube/latest/user-guide/rules/built-in-rule-tags/"
                target="_blank"
              >
                Learn More
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default Tag;
