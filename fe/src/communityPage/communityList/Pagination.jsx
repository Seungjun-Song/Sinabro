import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from 'styled-components'
import { GlobalColor } from "../../services/color";

const PrevNextButton = styled.div`
  cursor: pointer;

  ${props => props.no && css`
    visibility: hidden;
  `}
`

const PagenationBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  margin: 0 0 2rem 0;
  color: #888;
  font-size: 14px;

  width: 73%;

`

const PageNumber = styled.div`
  margin: 0 5px;
  cursor: pointer;
  width: 25px;
  border-radius: 30px;
  border: solid 1px rgba(0, 0, 0, 0);
  text-align: center;

  ${props => props.isSelected && css`
    font-weight: 700;
    background: ${GlobalColor.colors.sideMenu_select};
    color: white;
  `}
`

const PageList = styled.li`
  float: left;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Pagination = ({ totalItems, itemCountPerPage, pageCount, currentPage, selected, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const [start, setStart] = useState(1);
  const noPrev = start === 1;
  const noNext = start + pageCount - 1 >= totalPages;

  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage, pageCount, start]);

  return (
    <PagenationBox>
          <PrevNextButton 
            onClick={() => setCurrentPage(start - 1)}
            no={noPrev}
          >이전</PrevNextButton>

        {[...Array(pageCount)].map((a, i) => (
          <>
            {start + i <= totalPages && (
              <PageList key={i}>
                <PageNumber 
                    onClick={() => setCurrentPage(start+i)}
                    isSelected={currentPage === start + i}
                >
                    {start + i}
                </PageNumber>
              </PageList>
            )}
          </>
        ))}
          <PrevNextButton 
            onClick={() => setCurrentPage(start+pageCount)}
            no={noNext}
          >다음</PrevNextButton>
    </PagenationBox>
  );
}

export default Pagination;