import { Button, Typography, Stack, TextField, colors } from "@mui/material";
import { useState, useRef } from "react";
import IconComponent from "./IconComponent";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { codeEnvStateUpdator } from "reducer/CodeReducer";

const PaperInfo = () => {
  const paperInfo = useSelector((state) => state?.codeEnv);
  const [editStatus, setEditStatus] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  if (!paperInfo?.paperName || !paperInfo?.createdAt || pathname !== "/code") return null;

  const handleBlur = () => {
    if (editStatus) return setEditStatus(false);
    return;
  };

  const EditComponent = () => {
    const paperName = useRef(paperInfo.paperName);
    const handleOnChange = (e) => {
      paperName.current = e.target.value;
    };

    const handleSaveHandler = () => {
      if (paperName.current) {
        dispatch(codeEnvStateUpdator({ state: "paperName", stateValue: paperName.current }));
        setEditStatus(false);
      }
    };

    const handleSave = (e) => {
      if (e.key === "Enter") return handleSaveHandler();
    };

    if (editStatus) {
      return (
        <>
          <TextField
            inputProps={{
              style: {
                padding: 5,
                backgroundColor: colors.orange[100],
                borderRadius: 4,
              },
            }}
            size='small'
            onKeyUp={handleSave}
            defaultValue={paperName.current}
            onChange={handleOnChange}
            color='primary'
            onBlur={handleBlur}
            autoFocus
          />
          <Button variant='contained' onClick={handleSaveHandler} size='small'>
            Save
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Typography>{paperInfo.paperName}</Typography>
          <AiFillEdit
            onClick={() => setEditStatus(!editStatus)}
            className='w-4.5 h-4.5 hover:cursor-pointer hover:text-blue'
          />
        </>
      );
    }
  };

  return (
    <>
      <IconComponent className='h-16 w-16' />
      <Stack direction='column'>
        <Stack direction='row' alignItems='center' spacing={2}>
          <EditComponent />
        </Stack>
        <Typography sx={{ fontStyle: "oblique", color: "gray" }}>
          Created - {new Date(paperInfo.createdAt).toDateString()}
        </Typography>
      </Stack>
    </>
  );
};

export default PaperInfo;
