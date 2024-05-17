import styled, { css } from 'styled-components'
import { faDesktop, faCog, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const JobBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;

    margin: 1rem 0 0 0;

    gap: 0.5rem;
`

const Job = styled.div`
    border: 3px solid ${props => props.borderColor};
    color: ${props => props.borderColor};
    background: white;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
    
    padding: 1rem 0.6rem;
    gap: 10px;
    border-radius: 5px;
    max-height: 10px;
    box-shadow: 3px 4px 3px rgba(217, 217, 217, 1);
    font-size: 1rem;
    width: 9rem;

`
const Jobs = ({kind, post }) => {

    const [ memeberJobList, setMemberJobList ] = useState([])

    const [ feadbackJobList, setfeadbackJobList ] = useState([
        {
            name: "백",
            borderColor: "#315DCC",
            icon: faCog,
            selected: post.requiredBack,
        }, 
        {
            name: "프론트",
            borderColor: "#3DC7AE",
            icon: faDesktop,
            selected: post.requiredFront,
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

        else if(kind.name == "feadback"){
            setfeadbackJobList([
                {
                    name: "백",
                    selected: post.requiredBack,
                    borderColor: "#315DCC",
                    icon: faCog,
                }, 
                {
                    name: "프론트",
                    selected: post.requiredFront, 
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
                <>{job.target > 0 &&
                    <Job
                    borderColor={job.borderColor}
                >
                    {job.icon && <FontAwesomeIcon icon={job.icon} style={{ fontSize: '10px' }} />}
                    <div>
                    {job.name}
                    </div>
                    {job.current} / {job.target}
                </Job>
                }
                </>
            ))}               
            
            </>}
            
            {kind.name == "feadback" &&
            <>
                {feadbackJobList.map((job, index) => (
                    <>
                    {job.selected === 1 && 
                        <Job
                        borderColor={job.borderColor}
                        selected={job.selected === 1}
                        >
                            {job.icon && 
                            <FontAwesomeIcon icon={job.icon} style={{ fontSize: '10px' }} />}
                            <div>
                                {job.name}
                            </div>
                        </Job>}
                    </>
                ))}   
            </>
            }

        </JobBox>
    )
}

export default Jobs;