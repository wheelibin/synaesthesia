/* eslint-disable */
import p5 from "p5";

type P5WithState = p5 & { state: any };

export default function (p: P5WithState) {
  const frameRate = 30;
  const outputTopY = 128;

  let displayFont: p5.Font;

  p.state = {};

  p.preload = () => {
    displayFont = p.loadFont(`${process.env.PUBLIC_URL}/assets/OpenSans-SemiBold.ttf`);
  };

  p.setup = () => {
    p.frameRate(frameRate);
    // const sketchWidth = document.getElementById(p.state.containerId).offsetWidth;
    // const sketchHeight = document.getElementById(p.state.containerId).offsetHeight;
    // const canvas = p.createCanvas(sketchWidth, p.windowHeight);
    // canvas.parent(p.state.containerId);
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background(p.state.colours.base.hex());

    // Song key
    if (p.state.songKey) {
      p.fill(p.state.colours.base.lighten(1.2).hex());
      p.textAlign(p.CENTER);
      p.textFont(displayFont);
      p.textSize(50);
      p.text(`${p.state.songKey.root} ${p.state.songKey.typeName}`, p.width / 2, outputTopY);
    }

    // bass note
    if (p.state.noteDisplays.bass.alpha > 0) {
      p.fill(
        `RGBA(${p.state.colours.bass.red().toFixed(0)},${p.state.colours.bass.green().toFixed(0)},${p.state.colours.bass.blue().toFixed(0)},${
          p.state.noteDisplays.bass.alpha
        })`
      );
      p.textAlign(p.CENTER);
      p.textFont(displayFont);
      p.textSize(75);
      p.text(p.state.noteDisplays.bass.text, p.width / 2, outputTopY + 100);
      p.state.noteDisplays.bass.alpha -= p.state.noteDisplays.bass.alphaDecrement;
    }

    // chord note
    if (p.state.noteDisplays.chord.alpha > 0) {
      p.fill(
        `RGBA(${p.state.colours.chord.red().toFixed(0)},${p.state.colours.chord.green().toFixed(0)},${p.state.colours.chord.blue().toFixed(0)},${
          p.state.noteDisplays.chord.alpha
        })`
      );
      p.textAlign(p.CENTER);
      p.textFont(displayFont);
      p.textSize(75);

      p.text(p.state.noteDisplays.chord.text, p.width / 2, outputTopY + 350);
      p.state.noteDisplays.chord.alpha -= p.state.noteDisplays.chord.alphaDecrement;
    }

    // motif note
    if (p.state.noteDisplays.motif.alpha > 0) {
      p.fill(
        `RGBA(${p.state.colours.motif.red().toFixed(0)},${p.state.colours.motif.green().toFixed(0)},${p.state.colours.motif.blue().toFixed(0)},${
          p.state.noteDisplays.motif.alpha
        })`
      );
      p.textAlign(p.CENTER);
      p.textFont(displayFont);
      p.textSize(75);
      // p.textStyle(p.BOLD);
      p.text(p.state.noteDisplays.motif.text, p.width / 2, outputTopY + 450);
      p.state.noteDisplays.motif.alpha -= p.state.noteDisplays.motif.alphaDecrement;
    }

    const drumAngleDecrement = 0.13;

    // kick
    const kickDiameter =
      (p.sin(p.state.drumHitShapes.kick.angle + p.PI / 2) * p.state.drumHitShapes.kick.diameter) / 2 + p.state.drumHitShapes.kick.diameter / 2;
    if (Math.round(kickDiameter) > 0) {
      p.fill(p.state.colours.kick.hex());
      p.noStroke();
      p.ellipse(p.width / 2 - 150, outputTopY + 200, kickDiameter, kickDiameter);
      p.state.drumHitShapes.kick.angle -= drumAngleDecrement;
    }

    // snare
    const snareDiameter =
      (p.sin(p.state.drumHitShapes.snare.angle + p.PI / 2) * p.state.drumHitShapes.snare.diameter) / 2 + p.state.drumHitShapes.snare.diameter / 2;
    if (Math.round(snareDiameter) > 0) {
      p.fill(p.state.colours.snare.hex());
      p.noStroke();
      p.ellipse(p.width / 2 - 50, outputTopY + 200, snareDiameter, snareDiameter);
      p.state.drumHitShapes.snare.angle -= drumAngleDecrement;
    }

    // closed hat
    const closedHatDiameter =
      (p.sin(p.state.drumHitShapes.closedHat.angle + p.PI / 2) * p.state.drumHitShapes.closedHat.diameter) / 2 +
      p.state.drumHitShapes.closedHat.diameter / 2;
    if (Math.round(closedHatDiameter) > 0) {
      p.fill(p.state.colours.closedHat.hex());
      p.noStroke();
      p.ellipse(p.width / 2 + 50, outputTopY + 200, closedHatDiameter, closedHatDiameter);
      p.state.drumHitShapes.closedHat.angle -= drumAngleDecrement;
    }

    // open hat
    const openHatDiameter =
      (p.sin(p.state.drumHitShapes.openHat.angle + p.PI / 2) * p.state.drumHitShapes.openHat.diameter) / 2 +
      p.state.drumHitShapes.openHat.diameter / 2;
    if (Math.round(openHatDiameter) > 0) {
      p.fill(p.state.colours.openHat.hex());
      p.noStroke();
      p.ellipse(p.width / 2 + 150, outputTopY + 200, openHatDiameter, openHatDiameter);
      p.state.drumHitShapes.openHat.angle -= drumAngleDecrement;
    }
  };
}
