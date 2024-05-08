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
        console.log("selectJob", job);
        
        setJobList(jobList.map((v, i)=>{
            if( index !== i){
                return v;
            }
            else{
                return {...v, selected: !job.selected}
            }
        }))

        // if(name === "백"){
        //     setJobInfo((prevState) => {
        //         return{...prevState, backSelected: !jobInfo.backSelected}
        //     })
        // }
        // else if(name === "프론트"){
        //     setJobInfo((prevState) => {
        //         return{...prevState, frontSelected: !jobInfo.frontSelected}
        //     })
        // }
    }


    return(
        <JobBox>
            {kind == "member" && 
            <>
                {jobList.map((job, index) => (
                <Job
                    borderColor={job.borderColor}
                >
                    {job.icon && <FontAwesomeIcon icon={job.icon} style={{ fontSize: '15px' }} />}
                    <div>
                    {job.name}
                    </div>
                    {1} / {1}
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

        </JobBox>
    )
}

export default CreateJobsBox;