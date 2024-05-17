import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const JobBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 0.5rem;
`;

const Job = styled.div`
    border: 3px solid ${props => props.borderColor};
    color: ${props => props.borderColor};
    padding: 0.5rem 0.5rem;
    gap: 10px;
    border-radius: 5px;
    max-height: 5rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-shadow: 3px 4px 3px rgba(217, 217, 217, 1);
    font-size: 0.8rem;
    cursor: pointer;

    ${props => props.selected && css`
        background: ${props => props.borderColor};
        color: white;
    `}
`;

const CountBox = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: space-evenly;
    align-items: center;
`

const InputBox = styled.input`
    width: 1rem;
    border: 1px solid white;
    padding-left: 3px;
`;

const Button = styled.button`
    // height: 0.5rem;
    // width: 0.5rem;
    border: none;
    background: none;
`;

const VerticalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CreateJobsBox = ({kind, jobInfo, setJobInfo}) => {
    const selectJob = (job, index) => {
        setJobInfo(jobInfo.map((v, i) => {
            if(index !== i){
                return v;
            } else {
                return {...v, selected: 1-job.selected}
            }
        }))
    }

    const changeTotalVal = (data, index) => {
        setJobInfo(jobInfo.map((v, i) => {
            if(index !== i){
                return v;
            } else {
                if(data.nativeEvent.data == null || data.nativeEvent.data == ""){
                    return {...v, total: ""}
                } else {
                    return{...v, total: parseInt(data.nativeEvent.data)}
                }
            }
        }))
    }

    const changeTargetlVal = (data, index) => {
        setJobInfo(jobInfo.map((v, i) => {
            if(index !== i){
                return v;
            } else {
                if(data.nativeEvent.data == null || data.nativeEvent.data == ""){
                    return {...v, target: ""}
                } else {
                    return{...v, target: parseInt(data.nativeEvent.data)}
                }
            }
        }))
    }

    const incrementTotalVal = (index) => {
        setJobInfo(jobInfo.map((v, i) => {
            if(index !== i){
                return v;
            } else {
                return {...v, total: v.total < 3 ? v.total + 1 : 3}
            }
        }))
    }

    const decrementTotalVal = (index) => {
        setJobInfo(jobInfo.map((v, i) => {
            if(index !== i){
                return v;
            } else {
                return {...v, total: v.total > 0 ? v.total - 1 : 0}
            }
        }))
    }

    const incrementTargetlVal = (index) => {
        setJobInfo(jobInfo.map((v, i) => {
            if(index !== i){
                return v;
            } else {
                return {...v, target: v.target < 3 ? v.target + 1 : 3}
            }
        }))
    }

    const decrementTargetlVal = (index) => {
        setJobInfo(jobInfo.map((v, i) => {
            if(index !== i){
                return v;
            } else {
                return {...v, target: v.target > 0 ? v.target - 1 : 0}
            }
        }))
    }

    return (
        <JobBox>
            {kind.name === "member" && 
            <>
                {jobInfo.map((job, index) => (
                    <Job borderColor={job.borderColor}>
                        {job.icon && <FontAwesomeIcon icon={job.icon} style={{ fontSize: '15px' }} />}
                        <div>{job.name}</div>

                        <VerticalContainer>
                            <CountBox>
                            <Button onClick={() => incrementTotalVal(index)}> + </Button>
                            <InputBox value={job.total} onChange={(data) => changeTotalVal(data, index)} />
                            <Button onClick={() => decrementTotalVal(index)}> - </Button>
                            </CountBox>
                        </VerticalContainer>

                        <span> / </span>

                        <VerticalContainer>
                        <Button onClick={() => incrementTargetlVal(index)}> + </Button>  
                            <InputBox value={job.target} onChange={(data) => changeTargetlVal(data, index)} />
                            <Button onClick={() => decrementTargetlVal(index)}> - </Button>
                        </VerticalContainer>
                        
                    </Job>
                ))}
                3명 이하 인원만 가능해요!
            </>}
            
            {kind.name == "feadback" &&
            <>
                {jobInfo.map((job, index) => (
                <Job
                    borderColor={job.borderColor}
                    selected={job.selected === 1}
                    onClick={() => selectJob(job, index)}
                >
                    {job.icon && <FontAwesomeIcon icon={job.icon} style={{ fontSize: '10px' }} />}
                    <div>
                    {job.name}
                    {console.log(job.selected)}
                    </div>
                </Job>
                ))}   
            </>
            }
        
        </JobBox>
    )
}

export default CreateJobsBox;