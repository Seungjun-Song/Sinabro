import styled from 'styled-components'

import MoveToPjt from '/image/community/moveToPjt.png'

const Project = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 3rem;

    padding: 0.5rem 0.6rem 0.5rem 0.5rem;
    background: rgba(216, 245, 242, 1);

    border: 1px solid rgba(216, 245, 242, 1);
    border-radius: 10px;


`

const PjtInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;

    gap: 1rem;
`

const PjtProfile = styled.img`
    height: 3rem;
`

const PjtName = styled.div`
    font-family: Pretendard Medium;
`

const Link = styled.img`
`

const PjtLinkBox = ({pjtData}) => {
    return(
        <Project>
            <PjtInfo>
                <PjtProfile
                    src={pjtData.projectImg}>
                </PjtProfile>
                <PjtName>
                    {pjtData.title}
                </PjtName>
            </PjtInfo>

        
            <Link
                src={MoveToPjt}
            >
            </Link>
        </Project>
    )
}

export default PjtLinkBox;