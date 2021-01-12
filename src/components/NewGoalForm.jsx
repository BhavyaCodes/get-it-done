import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useInputState from "../hooks/useInputState";
import HashTagSelector from "./HashTagSelector";
import styled, { css } from 'styled-components'
import { StyledLabel } from '../styles/styled'


function NewGoalForm({ setGoals, globalHashTags }) {
  const [name, setName, resetName] = useInputState("");
  const [desc, setDesc, resetDesc] = useInputState("");
  const [hashTags, setHashTags] = useState([]);
  // time added assumed new Date() for now

  const resetForm = () => {
    resetName();
    resetDesc();
    setHashTags([]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      _id: uuidv4(),
      name,
      description: desc,
      timeAdded: new Date(),
      hashTags,
    };
    setGoals((prevGoals) => {
      return [...prevGoals, newGoal];
    });
    resetForm();
  };

  const StyledButton = styled.button`
  display: flex;
  border-radius: 32px;
  padding: 12px 0 12px 78px;
  width: 327px;
  background: transparent;
  color: #4B3402;
  border: 1px solid #4B3402;
  font-size: 18px;
  font-weight: 700;
  height: 48px;
  /* ${props => props.primary && css`
    background: white;
    color: black;
  `} */
`

const StyledInput = styled.input`
background: #FDFCFA;
border: 1px solid #B4AFA2;
border-radius: 4px;
width: 327px;
height: 40px;
`
const StyledInputLarge = styled.input`
background: #FDFCFA;
border: 1px solid #B4AFA2;
border-radius: 4px;
width: 327px;
height: 80px;
`


  return (
    <form onSubmit={handleFormSubmit}>
      <div style={{display: 'flex', justifyContent: 'center'}}><div>
      <StyledLabel>Title</StyledLabel>
      <StyledInput value={name} onChange={setName} />
      <StyledLabel capitalize>Goal</StyledLabel>
      <StyledInputLarge value={desc} onChange={setDesc} />
      </div></div>
      <HashTagSelector
        hashTags={hashTags}
        setHashTags={setHashTags}
        globalHashTags={globalHashTags}
      />
      {/* <button type="submit">Add a new task</button> */}
      <div style={{display: 'flex', justifyContent: 'center'}}><StyledButton  type="submit">Add a new task<span style={{paddingLeft: '16px'}} >✚</span></StyledButton></div>
    </form>
  );
}

export default NewGoalForm;

// To Do - update Form with proper Goal structure
// Validate Form
