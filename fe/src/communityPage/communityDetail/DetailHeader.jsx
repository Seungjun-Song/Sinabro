import styled, { css } from 'styled-components'

import DetailProceed from './DetailProceed'
const Header = styled.div`
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
    background: white;
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
`

const Date = styled.div`
    font-size: 80%;
`

const DetailHeader = ({kind, detailData}) => {
    return(
        <Header>
        <MainInfo>
        <DetailProceed
            detailData={detailData}
            kind={kind}
        />
            <Title>
                {detailData.title}
            </Title>
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