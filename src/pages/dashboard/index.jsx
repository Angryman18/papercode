import { useState, Fragment } from "react";

import { Box, Button } from "@mui/material";
import CreateModal from "components/create-modal.jsx";

const Dashboard = () => {
  const [createModal, setCreateModal] = useState(false);

  const handleCreateModal = () => {
    setCreateModal(!createModal);
  };

  return (
    <Fragment>
      <Box className='laptop:px-16 laptop:py-8 desktop:px-20 desktop:py-8 mobile:px-4 mobile:py-6 tablet:px-4'>
        <Button onClick={handleCreateModal} variant='contained' color='primary' size='large'>
          Create a Paper
        </Button>
        <hr className='mt-8' />
      </Box>
      <CreateModal open={createModal} toggle={handleCreateModal} />
    </Fragment>
  );
};

export default Dashboard;
