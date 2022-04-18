import * as React from "react";
import styles from "../css/SignUp.css";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/ConfigStore";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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


const SignUp = () =>  {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");
  const [user_name, setUserName] = React.useState("");

  const signup = () => {
    if (id === "" || pwd === "" || user_name === "") {
      alert("공백을 입력하지 말아주세요");
      return;
    }
    if (pwd !== pwd_check) {
      alert("비밀번호확인값과 비밀번호가 일치하지 않습니다.");
      return;
    }
    let exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (exptext.test(id) === false) {
      alert("이메일형식이 올바르지 않습니다.");
      return;
    }
    dispatch(userActions.signupFB(id, pwd, user_name));
    history.replace('/signin')
  };

  return (
    <ThemeProvider theme={theme}>
      <SignupTitle>
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
            회원가입을 해주세요
            {/* <span style={{ color: "blue" }}>HanggHae99</span>에 참여하세요 */}
          </h1>
          <h5>이 웹페이지는 slack의 클론코딩 사이트입니다.</h5>
        </div>
      </SignupTitle>

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
          <Box noValidate>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                이메일 주소
                <TextField
                  required
                  fullWidth
                  placeholder="name@work-email.com"
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                성명
                <TextField
                  required
                  fullWidth
                  placeholder="name"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                비밀번호
                <TextField
                  required
                  fullWidth
                  type="password"
                  placeholder="내 비밀번호"
                  onChange={(e) => {
                    setPwd(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                비밀번호 확인
                <TextField
                  required
                  fullWidth
                  placeholder="비밀번호 확인"
                  onChange={(e) => {
                    setPwdCheck(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor:'#4a154b', fontSize:'16px', fontWeight: '700'}}
              onClick={signup}
            >
              회원가입
            </Button>
          </Box>
        </Box>

        <LinkSignin>
          <button onClick={() => {
              history.push("/signin");
          }}>로그인으로 이동</button>
        </LinkSignin>
        <Copyright sx={{ mt: 3 }} />
      </Container>
    </ThemeProvider>
  );
}

const SignupTitle = styled.div`
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

const LinkSignin = styled.div`
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

export default SignUp;

