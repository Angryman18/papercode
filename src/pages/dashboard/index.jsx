// PACKAGES
import { useState, Fragment, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useUserId } from "@nhost/react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// COMPONENTS
import CreateModal from "components/create-modal.jsx";
import IconComponent from "components/IconComponent";
import DeleteModal from "./delete-modal";

// REDUCERS, SERVICES AND ACTIONS
import { registerPaperInfo } from "reducer/CodeReducer";
import { pushNotification } from "actions/snack.action";
import { getUserPaper, deletePaper } from "service/query";
import { retrieveSinglePaperInfo } from "reducer/CodeReducer";

// HOOKS & UTILS
import useGraphqlQuery from "hooks/useGraphqlQuery";
import { dateCalculator } from "helper/date-calc";

// STYLES
import "./index.css";

const MListItem = styled(ListItemButton)(({ theme }) => ({
  ...theme,
  "&.MuiListItemButton-divider": {
    borderColor: theme.palette.grey["800"],
  },
}));

const Dashboard = (props) => {
  const { accessToken, dispatch } = props;
  const [createModal, setCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allPapers, setAllPapers] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const userId = useUserId();
  const navigate = useNavigate();
  const [request] = useGraphqlQuery();

  const mountPaperInfo = useRef(null);
  const requestHandler = useRef(request);

  useEffect(() => {
    const query = getUserPaper(userId);
    requestHandler
      .current(query)
      .then((res) => {
        setAllPapers(res?.paperTable);
      })
      .catch(() => {
        return pushNotification("Something Went Wrong");
      });
  }, [userId, requestHandler]);

  const handleCreateModal = () => {
    setCreateModal(!createModal);
  };

  const handlePaperCreate = async (paperInfo) => {
    const { paperName, paperLang, paperLangExt } = paperInfo;
    const preaperObj = { paperName, paperLang, paperOwner: userId, paperLangExt };
    setLoading(true);
    await dispatch(registerPaperInfo({ data: preaperObj, token: accessToken }));
    setLoading(false);
    navigate("/code");
    return pushNotification(`Paper "${paperName}" is Created Successfully.`);
  };

  const deleteModalToggle = (e) => {
    mountPaperInfo.current = e
    return setDeleteModal(!deleteModal);
  };

  const handleClickListItem = async (paperId) => {
    try {
      await dispatch(retrieveSinglePaperInfo({ userId, paperId, token: accessToken }));
      return navigate("/code");
    } catch (err) {
      console.log(err);
      return pushNotification("Error Fetching Paper Info");
    }
  };

  const handleDeleteAction = async () => {
    const {paperId} = mountPaperInfo.current 
    const response = await request(deletePaper(userId, paperId)).catch(err => pushNotification('Error Deleeting Paper'));
    const deletedId = response?.delete_paperTable?.returning[0]?.paperId
    const papers = allPapers.filter(i => i.paperId !== deletedId);
    setAllPapers(papers);
    deleteModalToggle(null);
    return pushNotification('Paper Delete Successfully')
  };

  return (
    <Fragment>
      <Box className='laptop:px-16 laptop:py-8 desktop:px-20 desktop:py-8 mobile:px-4 mobile:py-6 tablet:px-4'>
        <Button onClick={handleCreateModal} variant='contained' color='primary' size='large'>
          Create a Paper
        </Button>
        <hr className='mt-8 mb-4' />
        <Box sx={{ color: "white", height: "70vh", overflowY: "auto" }}>
          {allPapers.length === 0 && (
            <Typography sx={{ textAlign: "center", color: "#949494" }}>
              No Paper Found. Please Create a Paper
            </Typography>
          )}
          <List component='nav' aria-label='main mailbox folders'>
            {allPapers?.map((item) => {
              return (
                <PaperListItem
                  key={item.paperId}
                  item={item}
                  handleClickListItem={handleClickListItem}
                  deleteModalToggle={deleteModalToggle.bind(null, item)}
                />
              );
            })}
          </List>
        </Box>
      </Box>
      <CreateModal
        open={createModal}
        loading={loading}
        handleCreateButton={handlePaperCreate}
        toggle={handleCreateModal}
      />
      <DeleteModal
        paperInfo={mountPaperInfo.current}
        toggle={deleteModalToggle}
        showModal={deleteModal}
        handleDeleteAction={handleDeleteAction}
      />
    </Fragment>
  );
};

// SINGLE PAPER FILE
const PaperListItem = ({ item, handleClickListItem, deleteModalToggle }) => {
  return (
    <Stack direction='row'>
      <MListItem
        onClick={handleClickListItem.bind(null, item.paperId)}
        className='select-item'
        divider={true}
      >
        <ListItemIcon sx={{ mx: 1 }}>
          <IconComponent value={item.paperLangExt} className='text-white w-12 h-12' />
        </ListItemIcon>
        <ListItemText primary={item.paperName} />
        <Typography variant='caption'>{dateCalculator(item.createdAt)}</Typography>
      </MListItem>
      <IconButton onClick={deleteModalToggle} aria-label='delete'>
        <DeleteIcon color='primary' fontSize='medium' />
      </IconButton>
    </Stack>
  );
};

export default connect()(Dashboard);
