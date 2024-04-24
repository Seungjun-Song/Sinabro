import styled from 'styled-components'

const Selection = styled.div`
    position: absolute;
    z-index: 999;

    background-color: rgba(58, 166, 184, 1);
    color: white;

    margin-top: 2%;
    width: 7rem;

    border: 2px solid rgba(58, 166, 184, 1);
    border-radius: 10px;

    font-family: LaundryGothicRegular;
`
const Option = styled.div`
    text-align: center
`

const TeamSelection = ({teamOption, setTeamOption, setTeamToggle}) => {
    const teamList = [
        {
            id: 1, 
            name: '7lans'
        },
        {
            id: 2,
            name: 'minuet'
        }
    ]

    const changeOption = (option) => {
        setTeamOption(option);
        setTeamToggle(false);
    }

    return (
        <Selection>
            <Option onClick={() => changeOption("팀 선택")}>
                팀 선택
            </Option>
            {teamList.map((team) => (
                <Option key={team.id} onClick={() => changeOption(team.name)}>
                    {team.name}
                </Option>
            ))}
        </Selection>
    )

}

export default TeamSelection;