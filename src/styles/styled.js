import styled from 'styled-components';

export const StyledLabel = styled.label`
  display: block;
  font-size: 12px;
  text-transform: ${({ capitalize }) => (capitalize ? 'capitalize' : 'none')};
  align-self: center;
  margin-bottom: 0;
  margin-top: 16px;
  color: #4B3402;
  font-weight: 400;
`;