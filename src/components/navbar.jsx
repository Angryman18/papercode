import { Button, styled, Typography, Box } from "@mui/material";
import { useState, Fragment } from "react";
import SignInModal from "./sign-in-modal";
import { useAuthenticated, useUserData } from "@nhost/react";

const CustomTypography = styled(Typography)(({ theme }) => ({
  ...theme,
  color: "white",
  fontFamily: "Roboto",
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "1.7rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "2rem",
  },
}));

export default function MaterialNavbar() {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const isAuthenticated = useAuthenticated();
  const userData = useUserData();

  const handleModalToggle = () => {
    setShowSignInModal(!showSignInModal);
  };
  return (
    <Fragment>
      <Box className='flex justify-between px-8 md:px-16 h-20 items-center'>
        <CustomTypography color='white'>Paper Code</CustomTypography>
        {!isAuthenticated && (
          <Button onClick={handleModalToggle} variant='contained' size='large' color='primary'>
            Sign In
          </Button>
        )}
        {isAuthenticated && <Typography color='white'>{userData?.displayName}</Typography>}
      </Box>
      <SignInModal open={showSignInModal} toggle={handleModalToggle} />
    </Fragment>
  );
}
