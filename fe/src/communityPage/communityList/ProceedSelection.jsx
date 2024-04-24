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
    text-align: center;

`

const ProceedSelection = ({proceedOption, setProceedOption, setProceedToggle, kind}) => {

    const changeOption = (option) => {
        setProceedOption(option);
        setProceedToggle(false);
    }

    return(
        <Selection>
            {kind === "team" || kind === "member" ? 
            (<>
                <Option onClick={() => {changeOption("모두")}}>
                    모두
                </Option>
                <Option onClick={() => {changeOption("모집 중")}}>
                    모집 중
                </Option>
                <Option onClick={() => {changeOption("모집 완료")}}>
                    모집 완료
                </Option>
            </>)
            :
            (<>
                <Option onClick={() => {changeOption("모두")}}>
                    모두
                </Option>
                <Option onClick={() => {changeOption("구걸 중")}}>
                    구걸 중
                </Option>
                <Option onClick={() => {changeOption("구걸 완료")}}>
                    구걸 완료
                </Option>
            </>)}

        </Selection>
    )
}


export default ProceedSelection;