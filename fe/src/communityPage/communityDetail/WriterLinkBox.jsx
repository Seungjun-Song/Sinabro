import styled from 'styled-components'

import MoveToPjt from '/image/community/moveToPjt.png'

const WriterBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 3rem;

    padding: 0.5rem 0.6rem 0.5rem 0.5rem;
    background: rgba(216, 245, 242, 1);

    border: 1px solid rgba(216, 245, 242, 1);
    border-radius: 10px;


`

const WriterInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;

    height: 2rem;

    gap: 1rem;
`

const WriterProfile = styled.img`
    height: 3rem;

    border: 0px solid black;
    border-radius: 50px;

    height: 90%;

`

const WriterName = styled.div`
    font-family: Pretendard Medium;
`

const WriterLink = styled.img`
`

const WriterLinkBox = ({detailData}) => {
    return(
        <WriterBox>
            <WriterInfo>
                <WriterProfile
                    src={detailData.writerprofile}>
                </WriterProfile>
                <WriterName>
                    @{detailData.writername}
                </WriterName>
            </WriterInfo>

        
            <WriterLink
                src={MoveToPjt}
            >
            </WriterLink>
        </WriterBox>
    )
}

export default WriterLinkBox;