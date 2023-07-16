import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import { TextField, Grid, Box } from "@mui/material";
import SignUpWindow from "src/layouts/authentication/sign-up";
import bgImage from "src/assets/images/TaeApril22.jpg";
import "./index.css";
import { AuthContext } from "src/contexts/AuthContext";

export default function SignIn() {
  const { id, setId, password, setPassword } = useContext(AuthContext);

  const movePage = useNavigate();

  const [showSignUp, setShowSignUp] = useState(false);
  const [hideSignUp, setHideSignUp] = useState(false);

  const onClickLogin = () => {
    console.log("click login");
    console.log("nickname : ", id);
    console.log("PW : ", password);
    axios
      .post("http://localhost:8080/authentication/sign-in", {
        nickname: id,
        pw: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.nickname === undefined) {
          // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          alert("The id you entered does not match.");
        } else if (res.data.nickname === null) {
          // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
          alert("The passwords you entered do not match.");
        } else if (res.data.nickname === id) {
          sessionStorage.setItem("user_id", id); // sessionStorage에 id를 user_id라는 key 값으로 저장

          movePage("/dashboard/main-page");
        }
      })
      .catch((error) => {
        console.error("An error occurred while calling the API.", error);
        alert("An error occurred while logging in. please try again.");
      });
  };

  /* handleMouse 구현 */
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Box className="bg-image" style={{ backgroundImage: `url(${bgImage})` }}>
      <Grid className="signin-form-style">
        <Grid item>
          <h1 className="banner-center">Sign In</h1>
        </Grid>
        <Grid item sx={{ marginTop: "2vh" }}>
          <TextField
            id="id-input"
            label="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            sx={{ zIndex: 0 }}
          />
        </Grid>
        <Grid item sx={{ marginTop: "1vh" }}>
          <TextField
            id="password-input"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            sx={{ zIndex: 0 }}
          />
        </Grid>
        <Grid item sx={{ marginTop: "2.5vh" }}>
          <Button
            type="button"
            variant="contained"
            onClick={onClickLogin}
            sx={{ width: "100%" }}
          >
            Login
          </Button>
        </Grid>

        <Grid item sx={{ marginTop: "1vh" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <div style={{ margin: "1.5vh", textAlign: "center" }}>
              Not a member yet? &nbsp;
              <a
                className="blue-emphasis"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setShowSignUp(true)}
              >
                SignUp
              </a>
              {showSignUp && (
                <div
                  className={`sign-up ${
                    hideSignUp
                      ? "slide-out-opacity"
                      : showSignUp
                      ? "slide-in-opacity"
                      : ""
                  }`}
                  onAnimationEnd={() => {
                    if (hideSignUp) {
                      setShowSignUp(false);
                      setHideSignUp(false);
                    }
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      className="close-btn"
                      onClick={() => {
                        setHideSignUp(true);
                      }}
                    >
                      &times;
                    </span>
                  </div>
                  <SignUpWindow />
                </div>
              )}
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
