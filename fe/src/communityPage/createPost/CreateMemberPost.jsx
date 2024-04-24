import styled from 'styled-components'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router';
const MemberPost = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    width: 96%;

    margin: 0 0 0 3rem;
`

const Header = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;

    margin: 1rem 0 2rem 0;
`

const Title = styled.input`
    width: 100%;
    height: 3rem;
    font-size: 2rem;
    border: none;
    outline: none;
    border-bottom: 2px solid rgba(189, 189, 189, 1);

    &::placeholder {
        color: rgba(189, 189, 189, 1);
        font-size: 2rem; 
    }

`

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    gap: 1rem;

    width: 100%;
    height: 100%;

    margin: 1rem 0 2rem 0;
`

const StyledEditor = styled.div`
  width: 100%; // CKEditor 컨테이너 너비를 100%로 설정
  .ck.ck-editor {
    width: 100%; // 에디터 자체의 너비를 100%로 설정
    margin: auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f8f8f8;
  }

  .ck.ck-content {
    min-height: 500px;
  }
`;

const Tag = styled.input`
    width: 100%;
    padding: 0.5rem 0 0.5rem 0.8rem;

    background: rgba(248, 248, 248, 1);

    border: 1px solid #ccc;
    border-radius: 8px;

    &::placeholder {
        color: rgba(157, 157, 157, 1);
    }

`

const Bottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    margin: 0 0 2rem 0;
`

const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    margin-left: auto;
`

const Cancel = styled.div`
    color: rgba(150, 143, 216, 1);
    text-align: center;
    padding: 0.2rem 1rem;
    border: 2px solid rgba(150, 143, 216, 1);
    border-radius: 5px;

    cursor: pointer; 
`

const Save = styled.div`
    color: white;
    background: rgba(150, 143, 216, 1);
    text-align: center;
    padding: 0.2rem 1rem;
    border: 0 solid rgba(150, 143, 216, 1);
    border-radius: 5px;

    cursor: pointer; 
`

const CreateMemberPost = () => {
    const navigate = useNavigate();

    const submit = () =>{
        //TODO: axios 게시물 저장

        navigate(-1);
    }

    return(
        <MemberPost>
            <Header>
                <Title
                    placeholder='제목을 입력하세요'>
                </Title>
            </Header>

            <Content>
                <StyledEditor>
                <CKEditor
                    editor={ClassicEditor}
                    placeholder={"프로젝트를 설명해 주세요!"}
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.

                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                    }}
                    onBlur={(event, editor) => {
                    }}
                    onFocus={(event, editor) => {
                    }} 
                />
                </StyledEditor>
                <Tag
                    placeholder='프로젝트 관련된 태그를 입력해주세요 ! 태그는 스페이스로 구분됩니다. 😃'>

                </Tag>
            </Content>

            <Bottom>
                <Buttons>
                    <Cancel onClick={() => navigate(-1)}>
                        취소
                    </Cancel>
                    <Save onClick={() => submit()}>
                        등록
                    </Save>
                </Buttons>
            </Bottom>
        </MemberPost>
    )
}

export default CreateMemberPost;