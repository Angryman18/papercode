import { Button, styled, Typography, Box, Stack } from "@mui/material";
import { useState, Fragment } from "react";
import SignInModal from "./sign-in-modal";
import { useAuthenticationStatus, useUserData, useSignOut } from "@nhost/react";

const CustomTypography = styled(Typography)(({ theme }) => ({
  ...theme,
  color: "white",
  fontFamily: "Roboto",
  verticalAlign: 'middle',
  padding: 16,
  marginLeft: -32,
  cursor: 'pointer',
  backgroundColor: theme.palette.primary.main,
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "1.7rem",
    padding: 20
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "2rem",
  },
}));

export default function MaterialNavbar() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleModalToggle = () => {
    setShowSignInModal(!showSignInModal);
  };

  return (
    <Fragment>
      <Box className='flex justify-between px-8 md:px-16 h-16 mobile:h-20 items-center'>
        <CustomTypography>Paper Code</CustomTypography>
        <SignedComponent handleModalToggle={handleModalToggle} />
      </Box>
      <SignInModal open={showSignInModal} toggle={handleModalToggle} />
    </Fragment>
  );
}

const SignedComponent = ({ handleModalToggle }) => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const userData = useUserData();
  const { signOut } = useSignOut();

  const handleSignOut = () => {
    signOut();
  }

  if (isLoading) return null;
  if (isAuthenticated) {
    return (
      <Stack direction='row' alignItems='center' spacing={2}>
        <img
          src={userData?.avatarUrl}
          alt='logo'
          className='w-12 h-12 rounded-full border-white bg-white'
        />
        <Box>
          <Typography color='white'><b>Hello,</b> {userData?.displayName.split(' ')[0]}</Typography>
          <Button
            sx={{
              backgroundColor: "gray",
              color: "white",
              m: 0,
              py: 0,
              px: 1.5,
              borderRadius: "30px",
              fontSize: "0.7rem",
            }}
            size='small'
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Box>
      </Stack>
    );
  }
  if (!isAuthenticated) {
    return (
      <Button onClick={handleModalToggle} variant='contained' size='large' color='primary'>
        Sign In
      </Button>
    );
  }
};
