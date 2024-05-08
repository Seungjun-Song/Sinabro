import styled, { css } from 'styled-components'
import { faDesktop, faCog, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const JobBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;

    gap: 0.5rem;
`

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

    ${props => props.selected === "true" && css`
        background: ${props => props.borderColor};
        color: white;
    `}

`

const InputBox = styled.input`
    width: 0.5rem;
    border: none;
    padding: 0;

`

const CreateJobsBox = ({kind, jobInfo, setJobInfo}) => {
    const [jobList, setJobList] = useState([
        {
            id: 1,
            name: "백",
            borderColor: "#315DCC",
            icon: faCog,
            selected: false,
        }, 
        {
            id: 2, 
            name: "프론트",
            borderColor: "#3DC7AE",
            icon: faDesktop,
            selected: false,
        }
    ])

    const selectJob = (job, index) =>{
        //console.log("selectJob", job);
        
        setJobList(jobList.map((v, i)=>{
            if( index !== i){
                return v;
            }
            else{
                return {...v, selected: !job.selected}
            }
        }))
    }

    const changeTargetVal = (data, index) => {
        setJobInfo(jobInfo.map((v, i) => {
            if(index !== i ){
                return v;
            }
            else{
                if(data.nativeEvent.data == null)
                    return {...v, target: ""}
                else
                    return{...v, target: data.nativeEvent.data};
            }
        }))
    

    }

    const changeTotalVal = (data, index) => {
        setJobInfo(jobInfo.map((v, i)=>{
            if(index !== i){
                return v;
            }
            else{
                return{...v, total: data.nativeEvent.data}
            }
        }))

    }
    return(
        <JobBox>
            {kind == "member" && 
            <>
                {jobInfo.map((job, index) => (
                <Job
                    borderColor={job.borderColor}
                >
                    {job.icon && <FontAwesomeIcon icon={job.icon} style={{ fontSize: '15px' }} />}
                    <div>
                    {job.name}
                    </div>
                    <InputBox
                        value={job.total}
                        onChange={(data) => changeTotalVal(data, index)}
                    >
                    </InputBox> / 
                    <InputBox
                        value={job.target}
                        onChange={(data) => changeTargetVal(data, index)}
                    >
                    </InputBox>
                </Job>
            ))}               
            
            </>}
            
            {kind == "feadback" &&
            <>
                {jobList.map((job, index) => (
                <Job
                    borderColor={job.borderColor}
                    selected={job.selected.toString()}
                    onClick={() => selectJob(job, index)}
                >
                    {job.icon && <FontAwesomeIcon icon={job.icon} style={{ fontSize: '10px' }} />}
                    <div>
                    {job.name}
                    {job.selected.toString()}
                    </div>
                </Job>
                ))}   
            </>
            }
        6명 이하 인원만 가능해요!
        </JobBox>
    )
}

export default CreateJobsBox;