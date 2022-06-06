import React from "react";
import {
  InputFeild,
  InputLabel,
  InputWrapper,
  Logo,
  SubmitButton,
} from "./commons";
import { Box, Container, Row, Column, Title, Item } from "./footer-style";

const Footer = () => {
  return (
    <Box>
      <Title>Contact Us</Title>
      <Container>
        <Row>
          <Column>
            <Item>
              <InputWrapper>
                <Logo
                  src="/location.png"
                  alt={"Avatar"}
                  style={{
                    marginRight: "20px",
                  }}
                ></Logo>
                <div>Akhalia, Sylhet</div>
              </InputWrapper>
            </Item>
            <Item>
              <InputWrapper>
                <Logo
                  src="/email.png"
                  alt={"Avatar"}
                  style={{
                    marginRight: "20px",
                  }}
                ></Logo>
                <div>support.abc@gmail.com</div>
              </InputWrapper>
            </Item>
            <Item>
              <InputWrapper>
                <Logo
                  src="/phone-call.png"
                  alt={"Avatar"}
                  style={{
                    marginRight: "20px",
                  }}
                ></Logo>
                <div>+8801234567891</div>
              </InputWrapper>
            </Item>
          </Column>
          <Column>
            <Item>
              <InputWrapper>|</InputWrapper>
            </Item>
            <Item>
              <InputWrapper>|</InputWrapper>
            </Item>
            <Item>
              <InputWrapper>|</InputWrapper>
            </Item>
          </Column>
          <Column>
            <Item>
              <InputWrapper>
                <InputLabel>Email</InputLabel>
                <InputFeild id="email" placeholder="abc@gmail.com" />
              </InputWrapper>
            </Item>
            <Item>
              <InputWrapper>
                <InputLabel>Mesage</InputLabel>
                <InputFeild id="message" placeholder="Write your query here!" />
              </InputWrapper>
            </Item>
            <Item>
              <InputWrapper>
                <SubmitButton>Send</SubmitButton>
              </InputWrapper>
            </Item>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
