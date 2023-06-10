import styled from "styled-components";

export const Box = styled.div`
  padding: 60px 40px;
  background: #c5c5c5;
  display: block;
  bottom: 0;
  width: 100%;
  margin-top: auto;
  color: #2d1d0d;
  font-family: cursive;
  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 500px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  text-align: center;
  margin-top: -40px !important;
  margin-bottom: 15px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 33%;
`;

export const Row = styled.div`
  display: flex;
`;

export const Item = styled.div`
  padding: 10px;
  margin: 10px;
  display: flex;
  text-align: center;
  align-self: center;
`;

export const Heading = styled.p`
  font-size: 24px;
  color: #fff;
  margin-bottom: 30px;
  font-weight: bold;
`;
