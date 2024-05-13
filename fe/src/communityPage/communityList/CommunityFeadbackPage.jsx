import styled from 'styled-components'

import { useState, useRef, useEffect } from 'react'

import Posts from './Posts'
import WriteButton from './WriteButton'
import ProceedOption from './ProceedOption'
import TeamOption from './TeamOption'
import SearchBox from './SearchBox'

const MemberPage = styled.div`
    display: flex;        
    flex-direction: column;
    width: 70%;
    margin-right : 20rem;
    margin-top : 4rem;
`

const Select = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    margin: 1rem 0;
`

const Option = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;

    cursor: pointer; 
`

const CommunityFeadBackPage = ({isDark, postList,  proceedOption, setProceedOption, teamOption, setTeamOption, searchWord, setSearchWord}) => {
    const [proceedToggle, setProceedToggle] = useState(false);
    const [teamToggle, setTeamToggle] = useState(false);

    const proceedRef = useRef();
    const teamRef = useRef();

    //토글 외부 클릭 시 토글 닫기
    useEffect(() => {
        function handleClikcOutside(event){
            if(proceedRef.current && !proceedRef.current.contains(event.target)){
                setProceedToggle(false);
            }
        }

        document.addEventListener("mousedown", handleClikcOutside);
        return () => {
            document.removeEventListener("mousedown", handleClikcOutside);
        }
    }, [setProceedToggle]);

    useEffect(() => {
        function handleClikcOutside(event){
            if(teamRef.current && !teamRef.current.contains(event.target)){
                setTeamToggle(false);
            }
        }

        document.addEventListener("mousedown", handleClikcOutside);
        return () => {
            document.removeEventListener("mousedown", handleClikcOutside);
        }
    }, [setTeamToggle]);

    //searchWord 상태값 변경
    const handleInputChange = (event) => {
        setSearchWord(event.target.value);  // 입력된 값으로 상태 업데이트
      };
    return(
        <MemberPage>
            <SearchBox
                placeholder={"팀 프로젝트를 검색해보세요"}
                searchWord={searchWord}
                handleInputChange={handleInputChange}
                // search={search}
                isDark={isDark}
            />

            <Select>

                <Option>
                <div ref={proceedRef}>
                <ProceedOption
                    proceedOption={proceedOption}
                    proceedToggle={proceedToggle}
                    setProceedOption={setProceedOption}
                    setProceedToggle={setProceedToggle}
                    kind={{id: 403, name: "feadback"}}
                    isDark={isDark}
                />
                </div>

                <div ref={teamRef}>
                <TeamOption
                    teamOption={teamOption}
                    teamToggle={teamToggle}
                    setTeamOption={setTeamOption}
                    setTeamToggle={setTeamToggle}
                    kind={{id: 403, name: "feadback"}}
                    isDark={isDark}
                />
                </div>
                </Option>

                <WriteButton
                    kind={{id: 403, name: "feadback"}}
                    isDark={isDark}
                />
              
            </Select>

            <Posts
                kind={{id: 403, name: "feadback"}}
                isDark={isDark}
                postList={postList}>
            </Posts>
        </MemberPage>
    )
}

export default CommunityFeadBackPage;