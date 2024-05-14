import styled, { css } from 'styled-components'

import { GlobalColor } from '../../services/color'

const Proceed = styled.div`
    background: ${GlobalColor.colors.proceeded};

    border: 0px solid ${GlobalColor.colors.proceeded};
    border-radius: 7px;

    font-family: LaundryGothicRegular;
    color: rgba(52, 69, 156, 1);
    font-size: 85%;
    flex-shrink: 0;

    text-align: center;
    width: 5rem;

    padding: 0.2rem 0.9rem;
    margin: 0 0 0.6rem 0;

    font-family: LaundryGothicRegular;

${props => props.$proceed && css`
    background: ${GlobalColor.colors.proceeding};
    padding: 0.2rem 0.6rem;
`}

    ${props => props.isDark && css`
        background: ${GlobalColor.colors.proceeded_dark};

        border: 0px solid ${GlobalColor.colors.proceeded_dark};

        color: white;

        ${props => props.$proceed && css`
            background: ${GlobalColor.colors.proceeding_dark};
            padding: 0.2rem 0.6rem;
            color: black;
        `}
    `}
`

const DetailProceed = ({detailData, kind, isDark}) => {
    return(
        <Proceed
            $proceed={detailData.proceed === false}
            isDark={isDark}
        >
        {kind.name === "feadback" ? (
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