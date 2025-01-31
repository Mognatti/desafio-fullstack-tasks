import styled from "styled-components";
import { IoAdd } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

export const TasksHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  * {
    margin: 16px 0;
  }
`;

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

export const TaskList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 0;
`;

export const AddTaskButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  max-height: 30px;
  background-color: transparent;
  font-size: 1em;
  transition: all 0.35s;

  &:hover {
    transform: translate(0, -2px) scale(1.05);
  }
`;

export const AddTaskIcon = styled(IoAdd)``;

export const EditTaskIcon = styled(MdEdit)``;

export const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background-color: transparent;
  height: 130px;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardTitle = styled.h4`
  font-weight: 400;
  font-size: 1.2em;
  margin: 0;
`;

export const CardDate = styled.span`
  font-size: 0.85em;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
  p {
    margin: 0;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
  height: 100%;
  gap: 16px;

  * {
    align-self: flex-end;
    max-height: 50px;
  }
`;
