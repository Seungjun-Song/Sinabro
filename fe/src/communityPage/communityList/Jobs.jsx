import styled, { css } from 'styled-components'
import { faDesktop, faCog, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const JobBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;

    gap: 0.5rem;
`

const Job = styled.div`
    backgroundColor: white;
    border: 3px solid black;

    padding: 0.5rem 0.3rem;
    gap: 10px;
    border-radius: 5px;
    max-height: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-shadow: 3px 4px 3px rgba(217, 217, 217, 1);
    font-size: 0.5rem;
`
const Jobs = ({kind, post }) => {

    const [ memeberJobList, setMemberJobList ] = useState([])

    const [ feadbackJobList, setfeadbackJobList ] = useState([
        {
            name: "백",
            borderColor: "#315DCC",
            icon: faCog,
        }, 
        {
            name: "프론트",
            borderColor: "#3DC7AE",
            icon: faDesktop
        }
    ])

    useEffect(()=>{
        if(kind.name == "member"){
            setMemberJobList([
                {
                    name: "백",
                    target: post.requiredBack,
                    current: post.recruitedBack,
                    borderColor: "#315DCC",
                    icon: faCog,
                }, 
                {
                    name: "프론트",
                    target: post.requiredFront, 
                    current: post.recruitedFront,
                    borderColor: "#3DC7AE",
                    icon: faDesktop
                }
            ])
        }
    }, [post])

    return(
        <JobBox>
            {kind.name == "member" && 
            <>
                {memeberJobList.map((job, index) => (
                <Job
                style={{backgroundColor: "white" , border: `3px solid ${job.borderColor }`, color: `${job.borderColor}` }}
                >
                    {job.icon && <FontAwesomeIcon icon={job.icon} style={{ fontSize: '10px' }} />}
                    <div>
                    {job.name}
                    </div>
                    {job.current} / {job.target}
                </Job>
            ))}               
            
            </>}
            
            {kind.name == "feadback" &&
            <>
                {feadbackJobList.map((job, index) => (
                <Job
                style={{backgroundColor: "white" , border: `3px solid ${job.borderColor }`, color: `${job.borderColor}` }}
                >
                    {job.icon && <FontAwesomeIcon icon={job.icon} style={{ fontSize: '10px' }} />}
                    <div>
                    {job.name}
                    </div>
                </Job>
                ))}   
            </>
            }

        </JobBox>
    )
}

export default Jobs;