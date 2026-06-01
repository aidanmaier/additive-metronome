import {useState} from 'react';
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import NumberField from "./NumberField";
import NumberDisplay from "./NumberDisplay";
import TempoSlider from './TempoSlider';
import { useClock } from '../hooks/useClock';
import ChangeHistoryRoundedIcon from '@mui/icons-material/ChangeHistoryRounded';
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';

export default function TempoControl() {
  const [playState, setPlayState] = useState(false); // playButton state
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const { bpm, setBpm } = useClock();

  const handleTapTempo = () => {
    const now = Date.now();
    let newTapTimes = [...tapTimes];

    // If more than 2 seconds since last tap, reset (new tap session)
    if (newTapTimes.length > 0 && now - newTapTimes[newTapTimes.length - 1] > 2000) {
      newTapTimes = [];
    }

    newTapTimes.push(now);

    // Keep only the last 4 taps
    if (newTapTimes.length > 4) {
      newTapTimes = newTapTimes.slice(-4);
    }

    setTapTimes(newTapTimes);

    // Calculate BPM if we have at least 2 taps
    if (newTapTimes.length >= 2) {
      const intervals: number[] = [];
      for (let i = 1; i < newTapTimes.length; i++) {
        intervals.push(newTapTimes[i] - newTapTimes[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const newBpm = Math.round(60000 / avgInterval);
      
      // Clamp to valid range (20-240)
      const clampedBpm = Math.max(20, Math.min(240, newBpm));
      setBpm(clampedBpm);
    }
  };

  return (
    <Box 
      sx={{ 
        flexGrow: 1,
        border: "1px solid lightgrey", 
        borderRadius: 2,
        m: 2
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
          sx={{ p: 0, width: 315, height: 20, alignItems: "center" }} 
        >
            <Typography>
                Tempo
            </Typography>
            <TempoSlider 
              min={20}
              max={240}
              value={bpm}
              onChange={(v: number) => setBpm(v)}
            />
        </Stack>
        <Stack direction={"row"} spacing={4} sx={{ alignItems: "center" }} >
          <Grid 
            container
            rowSpacing={1.5} 
            columnSpacing={4}
            // sx={{ alignItems: "center" }} 
          >
            <NumberField
              value={bpm}
              onChange={(v: number) => setBpm(v)}
              min={20}
              max={240}
            />
            <Button 
              variant="outlined" 
              aria-label="Tap tempo" 
              sx={{ 
                width: 90, 
                height: 50, 
                boxShadow: 1,
              }}
              onClick={handleTapTempo}
            >
              TAP
            </Button>
          </Grid>
          <Grid 
            container
            rowSpacing={1.5} 
            columnSpacing={4}
          >
            <Stack direction={"row"} spacing={2} >
              <Stack direction={"row"} >
                <CropSquareRoundedIcon htmlColor="green" />
                <NumberDisplay 
                  id={"shortBeatDisplay"} 
                  value={Math.round(bpm / 2)}
                />  
              </Stack>
              <Stack direction={"row"} >
                <ChangeHistoryRoundedIcon htmlColor="orangered" />
                <NumberDisplay 
                  id={"longBeatDisplay"}
                  value={Math.round(bpm / 3)}
                />
              </Stack>
            </Stack>
            <Button 
              id='playButton'
              variant="contained" 
              aria-label="Start metronome" 
              sx={{ width: 170, height: 50 }}
              onClick={() => setPlayState(!playState)} // binary state
            >
              {playState ? 
                <StopRoundedIcon /> :
                <PlayArrowRoundedIcon />
              }
            </Button>
          </Grid>
        </Stack>
      </Grid>
    </Box>
  );
}