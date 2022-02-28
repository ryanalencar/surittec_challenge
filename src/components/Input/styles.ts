import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  margin-bottom: 15px;
  padding: 12px 16px;
  border-radius: 4px;
  border: 2px solid #ddd;
  font-size: 15px;
  color: #444;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  }
`;

export const InputLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;
