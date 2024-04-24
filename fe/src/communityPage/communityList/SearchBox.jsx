import styled from 'styled-components'

import SearchButtonIcon from '/image/community/search.png'

const Search = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    width: 100%;

    border: 2px solid transparent;
    border-image: linear-gradient(to right, #3DC7AF, #613ACD);
    border-image-slice: 1;
    border-radius: 10px;

`

const SearchInput = styled.input`
    padding: 0.5rem 0.5rem;
    width: 90%;
    border: none;
    outline: none;
    
    &::placeholder { 
        color: rgba(189, 189, 189, 1); // 플레이스홀더 텍스트의 색상
    }
`

const SearchButton = styled.img`
    height: 1.2rem;
`

const SearchBox = ({placeholder, searchWord, handleInputChange, search}) => {
    return(
        <Search>
            <SearchInput
                placeholder={placeholder}
                value={searchWord}
                onChange={handleInputChange}
            >
            </SearchInput>
            <SearchButton
                src={SearchButtonIcon}
                onClick={()=> search()}
            >
            </SearchButton>

        </Search>
    )
}

export default SearchBox;