import React, { useEffect, useState } from "react";
import styled from "styled-components";
import jobs from "../../utils/jobs";
import { Form } from "../../components";
import { Button } from "../../components";
import { useHistory } from "react-router-dom";
import translate from "../../utils/translate";
import LanguagesDropDown from "../../components/LanguageDropDown";
import lodash from "lodash";

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
  ${({ direction }) => `flex-direction: ${direction ? direction : "row"};`}
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

const JobList = (props) => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState({
    code: "en",
    name: "English",
    nativeName: "English",
  });
  const fetchJobs = async (lang) => {
    const postList = await jobs.getAllJobs();
    
    if (lang.code === "en") {
      setPosts(postList);
      setResults(postList);
    } else {
      Promise.all(
        postList.map(async (entry) => {
          let result = await translate.trans([
            entry.length,
            entry.employmentType,
            entry.title,
          ]);
          result = result[0];
          return {
            ...entry,
            length: result[0],
            employmentType: result[1],
            title: result[2],
          };
        })
      ).then((data) => {
        setResults(data);
        setPosts(data);
      });
    }
    
  };
  useEffect(() => {
    fetchJobs(props.lang);
  }, [props.lang]);

  useEffect(() => {
    setResults(
      posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  useEffect(() => {
    setResults(
      posts.filter((post) =>
        post.languages.some((lang) => lodash.isEqual(lang, languageFilter))
      )
    );
  }, [languageFilter]);

  return (
    <ListContainer>
      <ButtonContainer>
        <Button onClick={() => history.push("/jobs/create")}>
          Create Job Posting
        </Button>
      </ButtonContainer>
      <Card direction="column">
        <h3>Filters</h3>
        <Form.Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <LanguagesDropDown
          width="30%"
          labelColor="black"
          label=""
          padding="0"
          value={languageFilter}
          onSelect={setLanguageFilter}
          displayValue="name"
        />
      </Card>
      {results.map((job) => (
        <Card key={job.id}>
          <Image src={job.image} />
          <div>
            <h3>{job.title}</h3>
            <p>Location: {job.location}</p>
            <p>Company: {job.company}</p>
            <Button onClick={() => history.push(`/jobs/${job.id}`)}>Apply</Button>
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
