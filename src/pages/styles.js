import styled from 'styled-components';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

export const Header = styled.div`
  width: 100%;
  background-color: #a7c3fa;
  margin-bottom: 40px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Filter = styled.div`
  padding-top: 10px;
  border-top: 1px solid #cacaca;
  width: 80%;
  margin: 20px auto 0 auto;
  display: flex;
  flex-direction: row;
  gap: 30px;
`;
export const languageGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
`;
export const filterBtn = styled(Button)`
`;
export const ProjectList = styled.div`
  margin: 20px auto 0 auto;
  width: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px 3%;
  padding-bottom: 40px;
`;
export const ProjectCard = styled(Card)`
    width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const modalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  box-shadow: 0 0 15px #626262;
  background-color: #fff;
  padding: 20px;
  text-align: center;
`;