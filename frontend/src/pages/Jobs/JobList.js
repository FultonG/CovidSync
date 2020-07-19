import React, { useEffect, useState } from "react";
import styled from "styled-components";
import jobs from "../../utils/jobs";

import { Button } from "../../components";
import { useHistory } from "react-router-dom";

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;
const Card = styled.div`
  display: flex;
  width: 70%;
  border-radius: 10px;
  background-color: white;
  padding: 2%;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.06);
  transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s;
  margin-top: 20px;

  @media only screen and (max-width: 576px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  width: 40%;

  @media only screen and (max-width: 576px) {
    margin: 0;
    width: 100%;
  }
`;

const LanguageChip = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  background-color: #00dafc;
  border-radius: 30px 30px 30px 30px;
  min-height: 25px;
  min-width: 75px;
  margin: 2px;
`;

const LanguageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  height: 150px;
  width: 150px;
  margin-right: 20px;

  @media only screen and (max-width: 576px) {
    margin: 0;
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0px;
  width: 70%;
`;

const JobList = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const postList = await jobs.getAllJobs();
      setPosts(postList);
    }

    fetchJobs();
  }, [])
  return (
    <ListContainer>
      <ButtonContainer>
        <Button onClick={() => history.push('/jobs/create')}>Create Job Posting</Button>
      </ButtonContainer>
      {posts.map((job) => (
        <Card key={job.id}>
          <Image src={job.image} />
          <div>
            <h3>{job.title}</h3>
            <p>Location: {job.location}</p>
            <p>Company: {job.company}</p>
          </div>
          <InformationContainer>
            <h5>Job information</h5>
            <p>Employment Type: {job.employmentType}</p>
            <p>Length: {job.length}</p>
            <p>Required Languages:</p>
            <LanguageContainer>
              {job.languages.map((lang) => (
                <LanguageChip>{lang.name}</LanguageChip>
              ))}
            </LanguageContainer>
          </InformationContainer>
        </Card>
      ))}
    </ListContainer>
  );
};

export default JobList;
