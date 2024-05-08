import {
  faAngleDown,
  faChevronDown,
  faCircleChevronDown,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
import styled from "styled-components";
import { motion } from "framer-motion";
const SliderContainer = styled.div`
  /* margin: 0px 200px; */
  border: solid 1px black;
`;
const SectionButton = ({ scrollToSection }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    // verticalSwiping: true,
    // swipeToSlide: true,
    autoplaySpeed: 2000,
    autoplay: true,
    arrows: false,
  };
  return (
    <>
      <motion.div

        transition={{ duration: 0.3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <FontAwesomeIcon
          style={{ color: "4c5fad" }}
          size="lg"
          icon={faCircleChevronDown}
        />
      </motion.div>
    </>
  );
};
export default SectionButton;
