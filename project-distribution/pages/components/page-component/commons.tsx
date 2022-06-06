import styled from "styled-components";

const Container = styled.div<{ isDragging: boolean }>`
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

const Title = styled.h4`
  padding: 5px;
  margin: 5px;
  display: flex;
`;

const OpenState = styled.span`
  color: #57ab5a;
  margin: 2px;
`;

const ClosedState = styled.span`
  color: #e5534b;
  margin: 2px;
`;
const MergedState = styled.span`
  color: #986ee2;
  margin: 2px;
`;

const State = styled.div`
  padding: 3px;
  margin: 3px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  background-color: #dadada;
  color: #3a3a3a;
  display: inline-block;
  font-size: 11px;
`;

export const Logo = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50% !important;
`;

export const Avatar = styled.div`
  float: right;
  display: inline-block;
  overflow: hidden;
  line-height: 1.5;
  vertical-align: middle;
  background-color: var(--color-avatar-bg);
  border-radius: 6px;
  flex-shrink: 0;
  box-shadow: 0 0 0 1px var(--color-avatar-border);
`;

const StyledLink = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
    color: #a37600;
  }
`;

export const PageWrapper = styled.div`
  background-color: #efefef;
  font-size: 15px;
  width: 100%;
`;

export const InputFeild = styled.input`
  width: 100%;
  height: 100%;
  padding: 5px;
  display: inline-block;
  border: 1px solid #343434;
  border-radius: 10px;
  box-sizing: border-box;
  text-align: center;
`;

export const InputWrapper = styled.div`
  float: left;
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
`;

export const InputLabel = styled.div`
  align-self: center;
  margin-right: 15px;
`;

export const SubmitButton = styled.button`
  background-color: #2d1d0d;
  color: #eedece;
  border: none;
  padding: 16px 32px;
  text-align: center;
  display: inline-block;
  font-size: 20px;
  font-family: cursive;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 10px;

  :hover {
    background-color: #9b9b9b;
    color: #2d1d0d;
  }
`;
export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};
