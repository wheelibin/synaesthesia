import React, { useCallback, useEffect, useState } from "react";
import * as Tone from "tone";
import * as color from "color";
import seedRandom from "seedrandom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Box, Button, Container, Toolbar, Typography, TextField, Grid } from "@material-ui/core";

import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import RandomiseIcon from "@material-ui/icons/Shuffle";

import * as utils from "./synth/utils";
import { ISongCallback } from "./songs/abstract/songTypes";
import { Song1 } from "./songs/Song1";
import { SongKey } from "./synth/types/SongKey";

import { IColours } from "./vis/types";
import sketch from "./vis/sketch";

import p5Wrapper from "./vis/P5Wrapper";
const P5Wrapper = p5Wrapper();

const initialSeed = "1606679580931";
seedRandom(initialSeed, { global: true });

const song = new Song1();
const frameRate = 24;

const useStyles = makeStyles({
  // "@global": {
  //   html: {
  //     backgroundColor: (c: IColours) => c.base.hex(),
  //   },
  // },
  appBar: {
    backgroundColor: "white",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const getColours = (baseColour: color) => {
  return {
    base: baseColour,
    kick: baseColour.darken(0.5),
    snare: baseColour.darken(0.2),
    closedHat: baseColour.lighten(0.2),
    openHat: baseColour.lighten(0.5),
    bass: baseColour.rotate(270),
    chord: baseColour.rotate(270).lighten(0.2),
    motif: baseColour.rotate(270).lighten(0.5),
  };
};

export const App: React.FC = () => {
  const classes = useStyles();
  const [seed, setSeed] = useState(initialSeed);
  const [songKey, setSongKey] = useState<SongKey>();
  const [colours, setColours] = useState<IColours | undefined>(undefined);
  const [drumHitShapes, setDrumHitShapes] = useState({
    kick: { diameter: 100, angle: 0 },
    snare: { diameter: 100, angle: 0 },
    closedHat: { diameter: 100, angle: 0 },
    openHat: { diameter: 100, angle: 0 },
  });
  const [noteDisplays, setNoteDisplays] = useState({
    bass: { text: "", alpha: 0, alphaDecrement: 0 },
    chord: { text: "", alpha: 0, alphaDecrement: 0 },
    motif: { text: "", alpha: 0, alphaDecrement: 0 },
  });
  const [isPlaying, setIsPlaying] = useState(false);

  // Create a new song on change of seed
  useEffect(() => {
    seedRandom(seed, { global: true });
    song.dispose();

    const createSong: () => void = async () => {
      const songParams = await song.create({
        seed,
        onBassNotePlayed,
        onMotifNotePlayed,
        onChordPlayed,
        onKickDrumHit,
        onSnareDrumHit,
        onClosedHatHit,
        onOpenHatHit,
      });
      setSongKey(songParams.key);
    };

    createSong();
  }, [seed]);

  // Change colours on change of seed
  useEffect(() => {
    const baseColour = color.rgb(utils.randomVariation(45, 25), utils.randomVariation(110, 25), utils.randomVariation(142, 25));
    const newColours = getColours(baseColour);
    setColours(newColours);
  }, [seed]);

  // song event handlers
  const onKickDrumHit: ISongCallback = useCallback(() => {
    drumHitShapes.kick.angle = 0;
    setDrumHitShapes(drumHitShapes);
  }, [drumHitShapes.kick]);

  const onSnareDrumHit: ISongCallback = useCallback(() => {
    drumHitShapes.snare.angle = 0;
    setDrumHitShapes(drumHitShapes);
  }, [drumHitShapes.snare]);

  const onClosedHatHit: ISongCallback = useCallback(() => {
    drumHitShapes.closedHat.angle = 0;
    setDrumHitShapes(drumHitShapes);
  }, [drumHitShapes.closedHat]);

  const onOpenHatHit: ISongCallback = useCallback(() => {
    drumHitShapes.openHat.angle = 0;
    setDrumHitShapes(drumHitShapes);
  }, [drumHitShapes.openHat]);

  const onBassNotePlayed: ISongCallback = useCallback(
    ({ note, duration }) => {
      const noteName = Tone.Frequency(note).toNote();
      const noteLength = Tone.Time(duration).toSeconds();
      noteDisplays.bass.text = noteName;
      noteDisplays.bass.alpha = 1;
      noteDisplays.bass.alphaDecrement = noteDisplays.bass.alpha / (frameRate * noteLength);
      setNoteDisplays(noteDisplays);
    },
    [noteDisplays.bass]
  );

  const onMotifNotePlayed: ISongCallback = useCallback(
    ({ note, duration }) => {
      const noteName = Tone.Frequency(note).toNote();
      const noteLength = Tone.Time(duration).toSeconds();
      noteDisplays.motif.text = noteName;
      noteDisplays.motif.alpha = 1;
      noteDisplays.motif.alphaDecrement = noteDisplays.motif.alpha / (frameRate * noteLength);
      setNoteDisplays(noteDisplays);
    },
    [noteDisplays.motif]
  );

  const onChordPlayed: ISongCallback = useCallback(
    ({ notes, duration }) => {
      const noteNames = notes.map((note) => Tone.Frequency(note).toNote());
      const noteLength = Tone.Time(duration).toSeconds();
      noteDisplays.chord.text = noteNames.join(" ");
      noteDisplays.chord.alpha = 1;
      noteDisplays.chord.alphaDecrement = noteDisplays.chord.alpha / (frameRate * noteLength);
      setNoteDisplays(noteDisplays);
    },
    [noteDisplays.chord]
  );

  // UI Event handlers
  const playPause = () => {
    song.playPause();
    setIsPlaying(song.isPlaying);
  };

  const handleRandomise = () => {
    setTimeout(() => {
      setSeed(new Date().getTime().toString());
    }, 1000);
  };

  const handleSeedChange = (e: { target: { value: string } }) => {
    setSeed(e.target.value);
  };

  return (
    <>
      <Container maxWidth="lg">
        {colours !== undefined && (
          <AppBar className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <Grid container alignItems="center">
                <Grid item md={4}>
                  <Typography variant="h6" color="textPrimary">
                    Synaesthesia
                  </Typography>
                </Grid>
                <Grid item md={4} style={{ textAlign: "center" }}>
                  <Box>
                    <Button onClick={handleRandomise} startIcon={<RandomiseIcon />}>
                      Randomise
                    </Button>
                    <Button onClick={playPause} startIcon={isPlaying ? <PauseIcon /> : <PlayIcon />}>
                      Play/Pause
                    </Button>
                  </Box>
                </Grid>
                <Grid item md={4} style={{ textAlign: "right" }}>
                  <TextField onChange={handleSeedChange} value={seed} margin="dense" label="Seed" variant="outlined" />
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        )}
      </Container>
      <Box id="vis-container">
        <P5Wrapper sketch={sketch} state={{ colours, drumHitShapes, noteDisplays, songKey, containerId: "vis-container" }}></P5Wrapper>
      </Box>
    </>
  );
};
