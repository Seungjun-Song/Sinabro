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
`
const TeamSelection = ({teamOption, setTeamOption}) => {
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

    return (
        <Selection>
            <div onClick={() => setTeamOption("팀 선택")}>
                팀 선택
            </div>
            {teamList.map((team, index) => (
                <div onClick={() => setTeamOption(team.name)}>
                    {team.name}
                </div>
            ))}
        </Selection>
    )

}

export default TeamSelection;