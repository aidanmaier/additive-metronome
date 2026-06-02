import { useState } from "react";
import type { MouseEvent } from "react";
import { Box, Grid, Stack, Typography, Button, Menu, MenuItem } from "@mui/material";
import { useSound } from "../hooks/useSound";
import BeatBox from "./BeatBox";
import ChangeHistoryRoundedIcon from '@mui/icons-material/ChangeHistoryRounded';
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded';
import { Add, Close } from '@mui/icons-material';

export default function PatternControl() {
  const { sequence, setSequence } = useSound();
  const maxLength = 16;
  const [pattern, setPattern] = useState(
    [{long: false}, {long: false}, {long: true}] // init pattern 2+2+3
  );

  const [optionsAnchorEl, setOptionsAnchorEl] = useState<null | HTMLElement>(null);
  const [addAnchorEl, setAddAnchorEl] = useState<null | HTMLElement>(null);

  const handleOptionsMenu = (event: MouseEvent<HTMLElement>) => {
    setOptionsAnchorEl(event.currentTarget);
  };
  const handleCloseOptionsMenu = () => {
    setOptionsAnchorEl(null);
  };

  const handleAddMenu = (event: MouseEvent<HTMLElement>) => {
    setAddAnchorEl(event.currentTarget);
  };
  const handleCloseAddMenu = () => {
    setAddAnchorEl(null);
  };

  const handleClearAll = () => {
    setPattern([]);
    setSequence([]);
    handleCloseOptionsMenu();
  };

  const handleAddShortBeat = () => {
    setPattern((prev) => [...prev, { long: false }]);
    setSequence([...sequence, 1, 0]);
    handleCloseAddMenu();
  };

  const handleAddLongBeat = () => {
    setPattern((prev) => [...prev, { long: true }]);
    setSequence([...sequence, 1, 0, 0]);
    handleCloseAddMenu();
  };

  return(
    <Box 
      sx={{ 
        flexGrow: 1,
        border: "1px solid lightgrey", 
        borderRadius: 2,
        maxWidth: 450,
      }} 
    >
      <Grid 
        container 
        rowSpacing={1.5} 
        columnSpacing={4}
        sx={{ m: 2, alignItems: "center" }} 
      >
        <Stack 
          direction={"row"} 
          spacing={4}
          sx={{ 
            p: 0, 
            width: 315, 
            height: 20, 
            alignItems: "center",
            justifyContent: "space-between", 
          }} 
        >
            <Typography >
                Pattern ({sequence.length} beats)
            </Typography>
            <Button 
              variant="outlined"
              sx={{
                height: 30,
                minWidth: 30,
                maxWidth: 30,
              }}
              onClick={handleOptionsMenu}
            >
              <Close fontSize="small" />
            </Button>
            <Menu 
              anchorEl={optionsAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
              }}
              open={Boolean(optionsAnchorEl)}
              onClose={handleCloseOptionsMenu}
            >
              <MenuItem onClick={handleClearAll}>
                Clear all
              </MenuItem>
            </Menu>
        </Stack>
        <Grid 
          container 
          spacing={1}
          sx={{ alignItems: "center" }} 
        >
          {
            pattern.map((beat, index) => (
              <BeatBox key={index} long={beat.long} />
            ))
          }
          <Button 
            aria-label="Add beat"
            variant="outlined"
            sx={{ 
                borderRadius: 2,
                width: 50,
                height: 50,
                alignContent: "center",
                p: 0,
            }} 
            // disable if sequence is too long
            disabled={ sequence.length < (maxLength - 1) ? false : true }
            onClick={handleAddMenu}
          >
            <Add fontSize="medium" />
          </Button>
          <Menu 
            anchorEl={addAnchorEl}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            open={Boolean(addAnchorEl)}
            onClose={handleCloseAddMenu}
          >
            <MenuItem 
              aria-label="Short beat" 
              onClick={handleAddShortBeat} 
            >
                <CropSquareRoundedIcon fontSize="large" htmlColor="green" />
            </MenuItem>
            { // disallow long beat if sequence too long
              sequence.length < (maxLength - 2) ? 
              <MenuItem 
                aria-label="Long beat" 
                onClick={handleAddLongBeat} 
              >
                <ChangeHistoryRoundedIcon fontSize="large" htmlColor="orangered" />
              </MenuItem> :
              <></>
            }
          </Menu>
        </Grid>
      </Grid>
    </Box>
    )
}