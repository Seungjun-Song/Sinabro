import styled, { css } from 'styled-components'
import { motion } from "framer-motion";

import DetailProceed from './DetailProceed'
import Jobs from './../communityList/Jobs'
const Header = styled(motion.div)`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;    
`

const MainInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;

    gap: 1rem;

    width: 100%;
`

const Title = styled.div`
`

const PlusInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: 1rem 0 0 0;

    width: 100%;
    height: 2rem;
`

const Writer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 1rem;
    height: 100%;
`

const ProfileImg = styled.img`
    height: 90%;

    border: 0px solid black;
    border-radius: 15px;
`

const Date = styled.div`
    font-size: 80%;
`

const headerMotion = {
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 }
    },
    transition: { duration: 0.3 }
}

const DetailHeader = ({kind, detailData, isDark}) => {
    return(
        <Header
            {...headerMotion}
        >
        <MainInfo>
        <DetailProceed
            detailData={detailData}
            kind={kind}
            isDark={isDark}
        />
            <Title>
                {detailData.title}
            </Title>
            <Jobs
                kind={kind}
            >
                
            </Jobs>
        </MainInfo>
        <PlusInfo>
            <Writer>
                <ProfileImg
                    src={detailData.writerprofile}
                />
                @{detailData.writername}
            </Writer>
            <Date>
                {detailData.time}    
            </Date>                    
        </PlusInfo>
    </Header>
    )
}

export default DetailHeader;