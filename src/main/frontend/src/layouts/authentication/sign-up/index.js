import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Grid, Box, InputAdornment } from "@mui/material";
import {
  Person as PersonIcon,
  PhoneIphone as PhoneIphoneIcon,
  Badge as BadgeIcon,
} from "@mui/icons-material";
import Button from "@mui/material/Button";
import EmailtextField from "src/components/emailField";
import ToglePasswordtextField from "src/components/toglePassword";

export default function SignUp() {
  const [su_id, setSignupId] = useState("");
  const [su_pw, setSignupPw] = useState("");
  const [su_name, setSignupName] = useState("");
  const [su_email, setSignupEm] = useState("");
  const [su_ad, setSignupAdid] = useState("");
  const [su_phone, setSignupPh] = useState("");
  const [id_error, setIdError] = useState(false);

  const movePage = useNavigate();

  /* handleMouse 구현 */
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const onClickSignup = () => {
    console.log("click signup");
    console.log("ID : ", su_id);
    console.log("PW : ", su_pw);
    console.log("Name : ", su_name);
    console.log("Admin : ", su_ad);
    console.log("Email: ", su_email);
    console.log("Phone : ", su_phone);
    axios
      .post("http://localhost:8080/authentication/sign-up", {
        su_nickname: su_id,
        su_password: su_pw,
        su_name: su_name,
        su_adminId: su_ad,
        su_email: su_email,
        su_phone: su_phone,
      })
      .then((res) => {
        console.log("Response : ", res);
        if (res.data.su_nickname === null && res.data.su_adminId !== null) {
          alert("This ID is either already registered or incorrect.");
        } else if (
          res.data.su_nickname !== null &&
          res.data.su_adminId === null
        ) {
          alert("Invalid manager number.");
        } else if (
          res.data.su_nickname === null &&
          res.data.su_adminId === null
        ) {
          alert("Invalid ID, admin number.");
        } else {
          alert("Sign up is complete.");
          movePage("/authentication/");
        }
      })
      .catch((error) => {
        console.error("An error occurred while calling the API.", error);
        alert("An error occurred while signing up. please try again.");
      });
  };

  const handlePwValue = (value) => {
    setSignupPw(value);
  };

  const handleEmailValue = (value) => {
    setSignupEm(value);
  };

  const handleID = (e) => {
    const value = e.target.value;
    const isValid = /^[a-zA-Z0-9]{1,10}$/.test(value); // 정규식을 사용하여 유효성 검사

    setSignupId(value);
    setIdError(!isValid);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2 className="response-header">Please create an admin account!</h2>
      <div className="signup-form-style">
        <TextField
          id="setID"
          label="ID"
          value={su_id}
          onChange={handleID}
          variant="standard"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          error={id_error}
          helperText={
            id_error ? "Please enter only letters and numbers of 10 digits or less." : ""
          }
          sx={{ width: "80%", marginBottom: "1vh" }}
        />

        <ToglePasswordtextField onChange={handlePwValue} />

        <EmailtextField onChange={handleEmailValue} />

        <TextField
          id="setPhone"
          label="Phone"
          value={su_phone}
          onChange={(e) => setSignupPh(e.target.value)}
          variant="standard"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIphoneIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: "80%", marginBottom: "1vh" }}
        />
        <Grid
          container
          spacing={1}
          alignItems="center"
          sx={{ width: "82%", marginBottom: "1vh" }}
          // width %로 위의 textField와 가로 길이 맞추었음
        >
          <Grid item xs={6}>
            <TextField
              id="setName"
              label="name"
              value={su_name}
              onChange={(e) => setSignupName(e.target.value)}
              variant="standard"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="setAdminID"
              label="admin ID"
              value={su_ad}
              onChange={(e) => setSignupAdid(e.target.value)}
              variant="standard"
              margin="normal"
            />
          </Grid>
        </Grid>

        <Button
          type="button"
          variant="contained"
          onClick={onClickSignup}
          sx={{ width: "80%", marginTop: "4vh" }}
        >
          SignUp
        </Button>
        <hr />
        <div style={{ marginTop: "3vh" }}>
          Have you already registered as a member? &nbsp;
          <a
            className="blue-emphasis"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => movePage("/authentication/")} //있으면 로그인으로 돌아가도록
          >
            LogIn
          </a>
        </div>
      </div>
    </div>
  );
}
