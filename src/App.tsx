import React, { useEffect, useState } from "react";
import p5 from "p5";
import * as Tone from "tone";
import * as color from "color";
import { createUseStyles } from "react-jss";

import * as utils from "./synth/utils";
import { ISongCallback } from "./songs/abstract/songTypes";
import { Song1 } from "./songs/Song1";
import { SongKey } from "./synth/types/SongKey";

let p5js: p5;

const song = new Song1();
const frameRate = 40;
const outputTopY = 75;
let displayFont: p5.Font;

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

const baseColour = color.rgb(utils.randomVariation(45, 50), utils.randomVariation(110, 50), utils.randomVariation(142, 50));
let colours = getColours(baseColour);

// let baseColour = color.rgb(45, 110, 142);

export const App = () => {
  const classes = useStyles();
  const [seed, setSeed] = useState("1604951306214"); //1604667243574

  const drumHitShapes = {
    kick: { diameter: 100, angle: 0 },
    snare: { diameter: 100, angle: 0 },
    closedHat: { diameter: 100, angle: 0 },
    openHat: { diameter: 100, angle: 0 },
  };

  const noteDisplays = {
    bass: { text: "", alpha: 0, alphaDecrement: 0 },
    chord: { text: "", alpha: 0, alphaDecrement: 0 },
    motif: { text: "", alpha: 0, alphaDecrement: 0 },
  };

  let songKey: SongKey;

  useEffect(() => {
    song.dispose();
    const songParams = song.create({
      seed,
      onBassNotePlayed,
      onMotifNotePlayed,
      onChordPlayed,
      onKickDrumHit,
      onSnareDrumHit,
      onClosedHatHit,
      onOpenHatHit,
    });

    songKey = songParams.key;

    const baseColour = color.rgb(utils.randomVariation(45, 50), utils.randomVariation(110, 50), utils.randomVariation(142, 50));
    colours = getColours(baseColour);

    if (p5js) {
      p5js.remove();
    }
    p5js = new p5(sketch, document.getElementById("p5"));
  }, [seed]);

  const onKickDrumHit: ISongCallback = () => {
    drumHitShapes.kick.angle = 0;
  };
  const onSnareDrumHit: ISongCallback = () => {
    drumHitShapes.snare.angle = 0;
  };
  const onClosedHatHit: ISongCallback = () => {
    drumHitShapes.closedHat.angle = 0;
  };
  const onOpenHatHit: ISongCallback = () => {
    drumHitShapes.openHat.angle = 0;
  };

  const onBassNotePlayed: ISongCallback = ({ note, duration }) => {
    const noteName = Tone.Frequency(note).toNote();
    const noteLength = Tone.Time(duration).toSeconds();
    noteDisplays.bass.text = noteName;
    noteDisplays.bass.alpha = 1;
    noteDisplays.bass.alphaDecrement = noteDisplays.bass.alpha / (frameRate * noteLength);
  };

  const onMotifNotePlayed: ISongCallback = ({ note, duration }) => {
    const noteName = Tone.Frequency(note).toNote();
    const noteLength = Tone.Time(duration).toSeconds();
    noteDisplays.motif.text = noteName;
    noteDisplays.motif.alpha = 1;
    noteDisplays.motif.alphaDecrement = noteDisplays.motif.alpha / (frameRate * noteLength);
  };

  const onChordPlayed: ISongCallback = ({ notes, duration }) => {
    const noteNames = notes.map((note) => Tone.Frequency(note).toNote());
    const noteLength = Tone.Time(duration).toSeconds();
    noteDisplays.chord.text = noteNames.join(" ");
    noteDisplays.chord.alpha = 1;
    noteDisplays.chord.alphaDecrement = noteDisplays.chord.alpha / (frameRate * noteLength);
  };

  const playPause = () => {
    song.playPause();
  };

  const handleRandomise = () => {
    song.stop();
    setTimeout(() => setSeed(new Date().getTime().toString()), 1000);
  };

  const handleSeedChange = (e: { target: { value: string } }) => {
    setSeed(e.target.value);
  };

  const sketch = (p: p5) => {
    p.preload = () => {
      displayFont = p.loadFont(`${process.env.PUBLIC_URL}/assets/OpenSans-SemiBold.ttf`);
    };

    p.setup = () => {
      p.frameRate(frameRate);
      p.createCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
      p.background(colours.base.hex());

      // Song key
      if (songKey) {
        p.fill(colours.base.lighten(1.2).hex());
        p.textAlign(p.CENTER);
        p.textFont(displayFont);
        p.textSize(50);
        p.text(`${songKey.root} ${songKey.typeName}`, p.width / 2, outputTopY);
      }

      // bass note
      if (noteDisplays.bass.alpha > 0) {
        p.fill(
          `RGBA(${colours.bass.red().toFixed(0)},${colours.bass.green().toFixed(0)},${colours.bass.blue().toFixed(0)},${noteDisplays.bass.alpha})`
        );
        p.textAlign(p.CENTER);
        p.textFont(displayFont);
        p.textSize(75);
        p.text(noteDisplays.bass.text, p.width / 2, outputTopY + 100);
        noteDisplays.bass.alpha -= noteDisplays.bass.alphaDecrement;
      }

      // chord note
      if (noteDisplays.chord.alpha > 0) {
        p.fill(
          `RGBA(${colours.chord.red().toFixed(0)},${colours.chord.green().toFixed(0)},${colours.chord.blue().toFixed(0)},${noteDisplays.chord.alpha})`
        );
        p.textAlign(p.CENTER);
        p.textFont(displayFont);
        p.textSize(75);

        p.text(noteDisplays.chord.text, p.width / 2, outputTopY + 350);
        noteDisplays.chord.alpha -= noteDisplays.chord.alphaDecrement;
      }

      // motif note
      if (noteDisplays.motif.alpha > 0) {
        p.fill(
          `RGBA(${colours.motif.red().toFixed(0)},${colours.motif.green().toFixed(0)},${colours.motif.blue().toFixed(0)},${noteDisplays.motif.alpha})`
        );
        p.textAlign(p.CENTER);
        p.textFont(displayFont);
        p.textSize(75);
        // p.textStyle(p.BOLD);
        p.text(noteDisplays.motif.text, p.width / 2, outputTopY + 450);
        noteDisplays.motif.alpha -= noteDisplays.motif.alphaDecrement;
      }

      const drumAngleDecrement = 0.13;

      // kick
      const kickDiameter = (p.sin(drumHitShapes.kick.angle + p.PI / 2) * drumHitShapes.kick.diameter) / 2 + drumHitShapes.kick.diameter / 2;
      if (Math.round(kickDiameter) > 0) {
        p.fill(colours.kick.hex());
        p.noStroke();
        p.ellipse(p.width / 2 - 150, outputTopY + 200, kickDiameter, kickDiameter);
        drumHitShapes.kick.angle -= drumAngleDecrement;
      }

      // snare
      const snareDiameter = (p.sin(drumHitShapes.snare.angle + p.PI / 2) * drumHitShapes.snare.diameter) / 2 + drumHitShapes.snare.diameter / 2;
      if (Math.round(snareDiameter) > 0) {
        p.fill(colours.snare.hex());
        p.noStroke();
        p.ellipse(p.width / 2 - 50, outputTopY + 200, snareDiameter, snareDiameter);
        drumHitShapes.snare.angle -= drumAngleDecrement;
      }

      // closed hat
      const closedHatDiameter =
        (p.sin(drumHitShapes.closedHat.angle + p.PI / 2) * drumHitShapes.closedHat.diameter) / 2 + drumHitShapes.closedHat.diameter / 2;
      if (Math.round(closedHatDiameter) > 0) {
        p.fill(colours.closedHat.hex());
        p.noStroke();
        p.ellipse(p.width / 2 + 50, outputTopY + 200, closedHatDiameter, closedHatDiameter);
        drumHitShapes.closedHat.angle -= drumAngleDecrement;
      }

      // open hat
      const openHatDiameter =
        (p.sin(drumHitShapes.openHat.angle + p.PI / 2) * drumHitShapes.openHat.diameter) / 2 + drumHitShapes.openHat.diameter / 2;
      if (Math.round(openHatDiameter) > 0) {
        p.fill(colours.openHat.hex());
        p.noStroke();
        p.ellipse(p.width / 2 + 150, outputTopY + 200, openHatDiameter, openHatDiameter);
        drumHitShapes.openHat.angle -= drumAngleDecrement;
      }
    };
  };

  return (
    <div>
      <header className={classes.toolbar}>
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
      <section id="p5"></section>
    </div>
  );
};

const useStyles = createUseStyles({
  "@global": {
    html: {
      backgroundColor: colours.base.hex(),
    },
  },
  toolbar: {
    height: 32,
    backgroundColor: colours.base.lighten(0.8).hex(),
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
