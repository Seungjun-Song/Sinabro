import styled from 'styled-components'

import Team from './Team'
import Go from './../../../public/image/nav/goTeamSpace.png'

const Box = styled.div`
    background-color: rgba(244, 249, 255, 1);
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    padding: 20px;
`
const TeamList = styled.div`
    margin-bottom: 20px;
`

const Create = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;

  font-weight: bold;

  width: 15rem;
  height: 3rem;
`;

const DropTeam = () => {
    //TODO : team list를 받아 와야함
    const teamList = [
        {
            id: 1,
            name: '7lans',
            pjtimg: '',
            date: '2024-02-01'
        },
        {
            id: 2,
            name: 'minuet',
            pjtimg: '',
            date: '2024-02-01'
        }
    ];

    return (
        <Box>
            {/* <li>7lans</li>
            <li>minuet</li> */}
            {/* <Team></Team> */}
            {teamList.map((team, index) => (
                <TeamList>
                <Team team={team} key={index}></Team>
                </TeamList>
            ))}

            {/* create team */}
            <Create>
                프로젝트 생성하기

                <img
                    src={Go}
                >
                </img>
            </Create>
        </Box>
    );
}

export default DropTeam;