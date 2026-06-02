// import * as React from 'react';
import { Button } from "@mui/material"
// import { Menu, MenuItem } from "@mui/material"
// import { Remove } from '@mui/icons-material';
import ChangeHistoryRoundedIcon from '@mui/icons-material/ChangeHistoryRounded';
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded';

interface BeatBoxProps {
  long: boolean;
  id?: string;
}

export default function BeatBox(props: BeatBoxProps) {
  const widthMod = props.long ? 1.5 : 1;
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  
  return(
    <>
      <Button 
        disabled
        sx={{ 
          border: "2px solid lightgrey", 
          borderRadius: 2,
          width: (50 * widthMod),
          height: 50,
          boxShadow: 1,
          alignContent: "center",
        }} 
        // onClick={handleMenu}
      >
        {props.long ? 
          <ChangeHistoryRoundedIcon fontSize="large" htmlColor="orangered" />: 
          <CropSquareRoundedIcon fontSize="large" htmlColor="green" />}
      </Button>
      {/* <Menu 
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem 
          aria-label="Change value"
          onClick={handleClose} 
        >
          {props.long ? 
            <CropSquareRoundedIcon fontSize="large" htmlColor="green" /> :
            <ChangeHistoryRoundedIcon fontSize="large" htmlColor="orangered" />}
        </MenuItem>
        <MenuItem onClick={handleClose} aria-label="Remove">
          <Remove 
            fontSize='large'
            htmlColor='blue'
          />
        </MenuItem>
      </Menu> */}
    </>
  )
}