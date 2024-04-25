import styled from 'styled-components'

const Comment = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    
    border-bottom: 1px solid rgba(196, 196, 196, 1);
    padding: 1rem 1rem;

`

const WriterInfo = styled.div`
    border-right: 1px solid rgba(196, 196, 196, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

`

const WriterProfile = styled.img`
`

const WriterName = styled.div`
    display: flex;
    justify-content: center; 
    font-size: 0.8rem;

    padding: 5px; 
    margin: 2px; 

    word-wrap: break-word; 
    width: 5rem; 
`

const CommentInfo = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;

`

const Content = styled.div`
    height: 100%;
    font-size: 0.9rem;

    padding: 0.5rem 0 0 1rem;
`

const Date = styled.div`
    text-align: right;
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.8rem;
`


const CommentBox = ({comment, index}) => {
    return(
        <Comment key={index}>
            <WriterInfo>
                <WriterProfile
                    src={comment.writerImg}/>
                <WriterName>
                    {comment.writerName}
                </WriterName>
            </WriterInfo>
            <CommentInfo>
                <Content>
                    {comment.content}
                </Content>
                <Date>
                    {comment.date}
                </Date>
            </CommentInfo>
        </Comment>
    )
}

export default CommentBox;