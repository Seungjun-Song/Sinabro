import styled, { css } from 'styled-components'

const Proceed = styled.div`
    background: rgba(144, 158, 231, 0.4);

    border: 0px solid rgba(144, 158, 231, 0.4);
    border-radius: 7px;

    font-family: LaundryGothicRegular;
    color: rgba(52, 69, 156, 1);
    font-size: 85%;

    padding: 0.2rem 0.9rem;

    font-family: LaundryGothicRegular;

${props => props.$proceed && css`
    background: rgba(161, 175, 247, 1);
    padding: 0.2rem 0.6rem;
`}
`

const DetailProceed = ({detailData, kind}) => {
    return(
        <Proceed
            $proceed={detailData.proceed === false}
        >
        {kind === "feadback" ? (
            <>
                {detailData.proceed === true ? 
                    ("구걸 중")
                    :
                    ("구걸 완료")
                }
            </>
        ) :
        (
            <>
                {detailData.proceed === true ? 
                    ("모집 중")
                    :
                    ("모집 완료")
                }
            </>
        )}
        </Proceed>  
    )
}

export default DetailProceed;