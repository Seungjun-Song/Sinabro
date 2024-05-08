import styled from 'styled-components'

import { useState, useRef , useEffect} from 'react'

import Posts from './Posts'
import WriteButton from './WriteButton'
import ProceedOption from './ProceedOption'
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

const CommunityTeamPage = ({isDark, postList, proceedOption, setProceedOption}) => {
    const [searchWord, setSearchWord] = useState("");
    const [proceedToggle, setProceedToggle] = useState(false);

    const proceedRef = useRef();

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
    
    //검색하기 axios
    const search = () => {

    }
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
                search={search}
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
                    kind={{id: 402, name: "team"}}
                    isDark={isDark}
                />
                </div>

                </Option>
                <WriteButton
                    kind={"team"}
                    isDark={isDark}
                />
            </Select>

            <Posts
                kind={"team"}
                isDark={isDark}
                postList={postList}
                >
            </Posts>
        </MemberPage>
    )
}

export default CommunityTeamPage;