import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import { createUseStyles } from "react-jss";
// import color from "color";

import p5 from "p5";

import "./App.css";
import { ISongCallback } from "./songs/abstract/songTypes";
import { Song1 } from "./songs/Song1";
import { SongKey } from "./synth/types/SongKey";

let p5js: p5;

const song = new Song1();
const frameRate = 40;
const outputTopY = 75;
let displayFont: p5.Font;

export const App = () => {
  const classes = useStyles();
  const [seed, setSeed] = useState("1604951306214"); //1604667243574

  const drumHitShapes = {
    kick: { diameter: 100, angle: 0, colour: "#0A4562" },
    snare: { diameter: 100, angle: 0, colour: "#175A7B" },
    closedHat: { diameter: 100, angle: 0, colour: "#46829F" },
    openHat: { diameter: 100, angle: 0, colour: "#73A7C0" },
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
      p.background("#2d6e8e");

      // Song key
      if (songKey) {
        p.fill("#D1E8F3");
        p.textAlign(p.CENTER);
        p.textFont(displayFont);
        p.textSize(50);
        // p.textStyle(p.BOLD);
        p.text(`${songKey.root} ${songKey.typeName}`, p.width / 2, outputTopY);
      }

      // bass note
      if (noteDisplays.bass.alpha > 0) {
        p.fill(`RGBA(163,203,222,${noteDisplays.bass.alpha})`);
        p.textAlign(p.CENTER);
        p.textFont(displayFont);
        p.textSize(75);
        // p.textStyle(p.BOLD);
        p.text(noteDisplays.bass.text, p.width / 2, outputTopY + 100);
        noteDisplays.bass.alpha -= noteDisplays.bass.alphaDecrement;
      }

      // chord note
      if (noteDisplays.chord.alpha > 0) {
        p.fill(`RGBA(214,234,244,${noteDisplays.chord.alpha})`);
        p.textAlign(p.CENTER);
        p.textFont(displayFont);
        p.textSize(75);
        // p.textStyle(p.BOLD);
        p.text(noteDisplays.chord.text, p.width / 2, outputTopY + 350);
        noteDisplays.chord.alpha -= noteDisplays.chord.alphaDecrement;
      }

      // motif note
      if (noteDisplays.motif.alpha > 0) {
        p.fill(`RGBA(163,203,222,${noteDisplays.motif.alpha})`);
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
        p.fill(drumHitShapes.kick.colour);
        p.noStroke();
        p.ellipse(p.width / 2 - 150, outputTopY + 200, kickDiameter, kickDiameter);
        drumHitShapes.kick.angle -= drumAngleDecrement;
      }

      // snare
      const snareDiameter = (p.sin(drumHitShapes.snare.angle + p.PI / 2) * drumHitShapes.snare.diameter) / 2 + drumHitShapes.snare.diameter / 2;
      if (Math.round(snareDiameter) > 0) {
        p.fill(drumHitShapes.snare.colour);
        p.noStroke();
        p.ellipse(p.width / 2 - 50, outputTopY + 200, snareDiameter, snareDiameter);
        drumHitShapes.snare.angle -= drumAngleDecrement;
      }

      // closed hat
      const closedHatDiameter =
        (p.sin(drumHitShapes.closedHat.angle + p.PI / 2) * drumHitShapes.closedHat.diameter) / 2 + drumHitShapes.closedHat.diameter / 2;
      if (Math.round(closedHatDiameter) > 0) {
        p.fill(drumHitShapes.closedHat.colour);
        p.noStroke();
        p.ellipse(p.width / 2 + 50, outputTopY + 200, closedHatDiameter, closedHatDiameter);
        drumHitShapes.closedHat.angle -= drumAngleDecrement;
      }

      // open hat
      const openHatDiameter =
        (p.sin(drumHitShapes.openHat.angle + p.PI / 2) * drumHitShapes.openHat.diameter) / 2 + drumHitShapes.openHat.diameter / 2;
      if (Math.round(openHatDiameter) > 0) {
        p.fill(drumHitShapes.openHat.colour);
        p.noStroke();
        p.ellipse(p.width / 2 + 150, outputTopY + 200, openHatDiameter, openHatDiameter);
        drumHitShapes.openHat.angle -= drumAngleDecrement;
      }
    };
  };

  return (
    <div>
      <header className={classes.toolbar}>
        <div className="toolbar__content">
          <div className="toolbar__main-buttons">
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
      backgroundColor: "#2d6e8e",
    },
  },
  toolbar: {
    height: 32,
    backgroundColor: "#73a7c0",
    padding: 16,
    "& button": {
      height: 34,
    },
  },
});
