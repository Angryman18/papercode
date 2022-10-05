import { DialogTitle, DialogContent, Dialog, Box, Typography, Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import nhost from "helper/nhost";

const SignInButton = ({ Component, text, handleAuth, provider }) => {
  return (
    <Button
      onClick={handleAuth.bind(null, provider)}
      sx={{ border: "1px solid gray", display: "flex", gap: "10px", color: "#444" }}
    >
      <Component className='w-5 h-5' />
      {text}
    </Button>
  );
};

const SignInModal = ({ open, toggle }) => {
  const handleAuthentication = (value) => {
    const currURL = window.location.href;
    window.location =
      process.env.REACT_APP_REDIRECT_URL + `${value}?redirectTo=${encodeURI(currURL)}`;
  };
  return (
    <Dialog maxWidth='xs' fullWidth={true} open={open} onClose={toggle}>
      <DialogTitle sx={{ textAlign: "center" }}>Sign In</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2, display: "flex", flexDirection: "column", gap: "1rem" }}>
          <SignInButton
            Component={FcGoogle}
            text='Sign In With Google'
            provider='google'
            handleAuth={handleAuthentication}
          />
          <SignInButton
            Component={BsGithub}
            text='Sign In With Github'
            provider='github'
            handleAuth={handleAuthentication}
          />
          <Typography color='GrayText' sx={{ textAlign: "right" }} variant='caption' display='block' gutterBottom>
            Powered By Nhost
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
