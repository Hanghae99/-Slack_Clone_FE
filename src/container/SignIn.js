import * as React from "react";
import styles from "../css/SignUp.css";
import { Icon } from "@iconify/react";
import { useDispatch, useEffect } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";
import { history } from "../redux/ConfigStore";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/LeeSangMin12">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const signin = () => {
    if (id === "" || pwd === "") {
      window.alert("아이디 또는 비밀번호가 비어있습니다! 입력해주세요");
      return;
    }
    dispatch(userActions.loginFB(id, pwd));
    history.push('/slack');
  };

  return (
    <ThemeProvider theme={theme}>
      <SigninTitle>
        <div className='logo'>
          <img alt='Slack' src='	https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg' height='34'/>
          {/* <div className="icon">
            <Icon
              icon="mdi:slack"
              color="aquamarine"
              width="55"
              height="55"
              inline={true}
            />
            <h1>slack</h1>
          </div> */}
        </div>
        <div className="title">
          <h1>
            로그인하여 채팅에 참여하세요
            {/* <span style={{ color: "blue" }}>HanggHae99</span>에 참여하세요 */}
          </h1>
          <h5>이 웹페이지는 slack의 클론코딩 사이트입니다.</h5>
          <h5>hanghae99.slack.com</h5>
        </div>
      </SigninTitle>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                이메일 주소
                <TextField required fullWidth label="name@work-email.com" 
                onChange={(e) => {
                  setId(e.target.value);
                }}
                />
              </Grid>
              <Grid item xs={12}>
                비밀번호
                <TextField
                  required
                  fullWidth
                  label="내 비밀번호"
                  onChange={(e) => {
                    setPwd(e.target.value);
                  }}
                  type="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={signin}
              style={{backgroundColor:'#4a154b', fontSize:'16px', fontWeight: '700'}}
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
          </Box>
        </Box>
        <LinkSignup>
          Slack을 처음 사용하시나요?
          <br/>
          <button onClick={() => {
              history.push("/signup");
          }}>회원가입으로 이동</button>
        </LinkSignup>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}


const SigninTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .logo {
    padding: 40px 0 25px;
    margin: auto;
  }
  .title {
    margin: auto;
    h1 {
      font-size: 38px;
      font-weight: 700;
      line-height: 46px;
      text-align: center;
      margin-bottom: 14px;
    }
    h5 {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: #454245;
      text-align: center;
    }
  }
`;

const LinkSignup = styled.div`
  margin-top: 10px;
  font-size: 15px;
  text-align: center;
  button {
    font-size: 15px;
    outline: none;
    border: none;
    background-color: transparent;
    color: #1264a3;
    font-weight: 700;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
`;