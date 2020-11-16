import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import * as color from "color";
import seedRandom from "seedrandom";
import { createUseStyles } from "react-jss";

import * as utils from "./synth/utils";
import { ISongCallback } from "./songs/abstract/songTypes";
import { Song1 } from "./songs/Song1";
import { SongKey } from "./synth/types/SongKey";

import { IColours } from "./vis/types";
import sketch from "./vis/sketch";

import p5Wrapper from "./vis/P5Wrapper";
const P5Wrapper = p5Wrapper();

const initialSeed = "1605532643445"; //"1605046628792";
seedRandom(initialSeed, { global: true });

const song = new Song1();
const frameRate = 40;

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

export const App: () => JSX.Element = () => {
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
  const onKickDrumHit: ISongCallback = () => {
    drumHitShapes.kick.angle = 0;
    setDrumHitShapes(drumHitShapes);
  };
  const onSnareDrumHit: ISongCallback = () => {
    drumHitShapes.snare.angle = 0;
    setDrumHitShapes(drumHitShapes);
  };
  const onClosedHatHit: ISongCallback = () => {
    drumHitShapes.closedHat.angle = 0;
    setDrumHitShapes(drumHitShapes);
  };
  const onOpenHatHit: ISongCallback = () => {
    drumHitShapes.openHat.angle = 0;
    setDrumHitShapes(drumHitShapes);
  };

  const onBassNotePlayed: ISongCallback = ({ note, duration }) => {
    const noteName = Tone.Frequency(note).toNote();
    const noteLength = Tone.Time(duration).toSeconds();
    noteDisplays.bass.text = noteName;
    noteDisplays.bass.alpha = 1;
    noteDisplays.bass.alphaDecrement = noteDisplays.bass.alpha / (frameRate * noteLength);
    setNoteDisplays(noteDisplays);
  };

  const onMotifNotePlayed: ISongCallback = ({ note, duration }) => {
    const noteName = Tone.Frequency(note).toNote();
    const noteLength = Tone.Time(duration).toSeconds();
    noteDisplays.motif.text = noteName;
    noteDisplays.motif.alpha = 1;
    noteDisplays.motif.alphaDecrement = noteDisplays.motif.alpha / (frameRate * noteLength);
    setNoteDisplays(noteDisplays);
  };

  const onChordPlayed: ISongCallback = ({ notes, duration }) => {
    const noteNames = notes.map((note) => Tone.Frequency(note).toNote());
    const noteLength = Tone.Time(duration).toSeconds();
    noteDisplays.chord.text = noteNames.join(" ");
    noteDisplays.chord.alpha = 1;
    noteDisplays.chord.alphaDecrement = noteDisplays.chord.alpha / (frameRate * noteLength);
    setNoteDisplays(noteDisplays);
  };

  // UI Event handlers
  const playPause = () => {
    song.playPause();
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
    <div>
      {colours !== undefined && (
        <header className={classes.toolbar} style={{ backgroundColor: colours.base.lighten(0.8).hex() }}>
          <div className={classes.toolbarContent}>
            <div className={classes.toolbarMainButtons}>
              <button onClick={handleRandomise}>Randomise</button>
              <button onClick={playPause}>Play/Pause</button>
            </div>
            <div>
              <input type="text" value={seed} onChange={handleSeedChange}></input>
              <button onClick={playPause}>Go</button>
            </div>
          </div>
        </header>
      )}
      <P5Wrapper sketch={sketch} state={{ colours, drumHitShapes, noteDisplays, songKey }}></P5Wrapper>
    </div>
  );
};

const useStyles = createUseStyles({
  // "@global": {
  //   html: {
  //     backgroundColor: (c: IColours) => c.base.hex(),
  //   },
  // },
  toolbar: {
    height: 32,
    padding: 16,
    "& button": {
      height: 34,
    },
  },
  toolbarContent: {
    margin: "0 auto",
    maxWidth: 1024,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toolbarMainButtons: {
    marginRight: -16,
    "& button": {
      marginRight: 16,
    },
  },
});
