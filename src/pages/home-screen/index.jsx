// PACKAGES
import * as React from "react";
import { useState } from "react";
import { useAuthenticationStatus } from "@nhost/react";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";

// COMPONENTS
import { Typography, styled } from "@mui/material";
import Button from "@mui/material/Button";
import CreateModal from "../../components/create-modal";

// STYLES
import "./home-screen.scss";

// REDUCER
import { createPaper } from "reducer/CodeReducer";

// UTILS
import strings from "./type-strings";

const CustomTypography = styled(Typography)(({ theme }) => ({
  ...theme,
  fontFamily: "Fira Code",
  color: "white",
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "3.75rem",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "5.5rem",
  },
}));

export default function HomeScreen() {
  const [createPaperModal, setCreatePaperModal] = useState(false);
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const navigate = useNavigate();

  const toggleCreateModal = (e) => {
    setCreatePaperModal(!createPaperModal);
  };

  const handlePaperCreate = (paperInfo) => {

  }

  if (isLoading) return null;
  if (isAuthenticated) {
    return navigate("/home");
  }

  return (
    <>
      <div className='home-view'>
        <div id='title'>
          <div className='flex flex-col gap-y-8 w-full'>
            <CustomTypography>
              <Typewriter
                options={{
                  strings,
                  delay: 100,
                  autoStart: true,
                  loop: true,
                  skipAddStyles: true,
                  pauseFor: 2500,
                }}
              />
            </CustomTypography>
            <div className='tablet:w-1/3 w-full text-white'>
              Paper is online coding playground tool or an IDE to write your code, run and save
              them. It is free of cost to run and play around it.
            </div>
            <div>
              <Button onClick={toggleCreateModal} variant='contained' color='primary' size='large'>
                Create a Paper
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CreateModal
        handleCreateButton={handlePaperCreate}
        open={createPaperModal}
        toggle={toggleCreateModal}
      />
    </>
  );
}
