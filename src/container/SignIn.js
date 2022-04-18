import * as React from "react";
import styles from "../css/SignUp.css";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

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
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="icon">
        <Icon
          icon="mdi:slack"
          color="aquamarine"
          width="55"
          height="55"
          inline={true}
        />
        <h2>slack</h2>
      </div>

      <div className="title">
        <h1>
          <span style={{ color: "blue" }}>HanggHae99</span>에 참여하세요
        </h1>
        <h5>hanghae99.slack.com</h5>
      </div>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Grid container spacing={2}>
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
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
