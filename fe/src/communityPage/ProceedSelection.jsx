import styled from 'styled-components'

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

const Option = styled.div`

`

const ProceedSelection = ({proceedOption, setProceedOption}) => {
    return(
        <Selection>
            <Option onClick={() => {setProceedOption("모두")}}>
                모두
            </Option>
            <Option onClick={() => {setProceedOption("진행 중")}}>
                진행 중
            </Option>
            <Option onClick={() => {setProceedOption("진행 완료")}}>
                진행 완료
            </Option>

        </Selection>
    )
}

export default ProceedSelection;