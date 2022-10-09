// PACKAGES
import { useState, Fragment } from "react";
import { useDispatch } from "react-redux";

import { Box, Button } from "@mui/material";
import CreateModal from "components/create-modal.jsx";

import { registerPaperInfo } from "reducer/CodeReducer";
import { useUserId } from "@nhost/react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [createModal, setCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = useUserId();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateModal = () => {
    setCreateModal(!createModal);
  };

  const handlePaperCreate = async (paperInfo) => {
    const { paperName, paperLang } = paperInfo;
    const preaperObj = { paperName, paperLang, paperOwner: userId};
    setLoading(true);
    const resp = await dispatch(registerPaperInfo(preaperObj));
    console.log(resp);
    setLoading(false);
    // return navigate("/code");
  };

  return (
    <Fragment>
      <Box className='laptop:px-16 laptop:py-8 desktop:px-20 desktop:py-8 mobile:px-4 mobile:py-6 tablet:px-4'>
        <Button onClick={handleCreateModal} variant='contained' color='primary' size='large'>
          Create a Paper
        </Button>
        <hr className='mt-8' />
      </Box>
      <CreateModal
        open={createModal}
        handleCreateButton={handlePaperCreate}
        toggle={handleCreateModal}
      />
    </Fragment>
  );
};

export default Dashboard;
