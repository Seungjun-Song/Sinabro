import styled from 'styled-components'
import { motion } from "framer-motion"

const Selection = styled.div`
    position: absolute;
    z-index: 999;

    background-color: rgba(62, 200, 175, 1);
    color: white;

    margin-top: 2%;
    width: 7rem;

    border: 2px solid rgba(62, 200, 175, 1);
    border-radius: 10px;
`

const Option = styled(motion.div)`
    text-align: center;

    font-family: LaundryGothicRegular;

`

const toggleMotion = {
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 }
    },
    transition: { duration: 0.3 }
}

const ProceedSelection = ({proceedOption, setProceedOption, setProceedToggle, kind}) => {

    const changeOption = (option) => {
        setProceedOption(option);
        setProceedToggle(false);
    }

    const selectData = ["모두", "모집 중", "모집 완료"];

    return(
        <Selection>
            {kind === "team" || kind === "member" ? 
            (<>
                <Option 
                    onClick={() => {changeOption("모두")}}
                    {...toggleMotion}
                >
                    모두
                </Option>
                <Option 
                    onClick={() => {changeOption("모집 중")}}
                    {...toggleMotion}
                >
                    모집 중
                </Option>
                <Option 
                    onClick={() => {changeOption("모집 완료")}}
                    {...toggleMotion}
                >
                    모집 완료
                </Option>
            </>)
            :
            (<>
                <Option 
                    onClick={() => {changeOption("모두")}}
                    {...toggleMotion}
                >
                    모두
                </Option>
                <Option 
                    onClick={() => {changeOption("구걸 중")}}
                    {...toggleMotion}
                >
                    구걸 중
                </Option>
                <Option 
                    onClick={() => {changeOption("구걸 완료")}}
                    {...toggleMotion}
                >
                    구걸 완료
                </Option>
            </>)}

        </Selection>
    )
}


export default ProceedSelection;