import React, { Component } from "react";

import { assignables, modalScalesTextUpper, rootKeys, voicingNames, voicingType } from "../../scripts/GlobalVariables";
import chordsFactory from "../../scripts/Chords/ChordsFactory";

class PrinterButton extends Component {
  constructor(props) {
    super(props);
    this.print = this.print.bind(this);
    this.writePage = this.writePage.bind(this);
    this.scoreContainer = undefined;
  }

  /**
   * Function to print or save on pdf
   * @returns if the list of the chords is empty
   */
  print() {
    if (assignables.chords[0] === "") return;

    const effettiveChords = chordsFactory.getChordsToPrint(
      assignables.chords,
      1,
      assignables.selectedName,
      assignables.selectedType
    );

    let scope = document.createElement("div");
    let tableHtmlContent = document.createElement("h1");
    tableHtmlContent.textContent = "Voicings Generator";
    let keySignature = document.createElement("h3");
    keySignature.textContent = "Key Signature: " + rootKeys[assignables.currentKey];
    let modalContent = document.createElement("h3");
    modalContent.textContent = "Modal Scale: " + modalScalesTextUpper[assignables.currentMode];
    let voiceNameContent = document.createElement("h3");
    voiceNameContent.textContent = "Voicing Name: " + voicingNames[assignables.selectedName];
    let voiceTypeContent = document.createElement("h3");
    voiceTypeContent.textContent = "Voicing Type: " + voicingType[assignables.selectedType];
    let chordScope = document.createElement("h3");
    let i = 0;
    let chordsList = "";
    let [treble, bass] = [true, false];

    while (effettiveChords[i] != null) {
      if (i === 0) {
        chordsList += effettiveChords[i].name;
      } else {
        chordsList += ", " + effettiveChords[i].name;
      }
      i++;
    }
    chordScope.textContent = "Chords List: " + chordsList;

    i = 0;
    let scoreCont = document.createElement("table");
    let tbody = scoreCont.appendChild(document.createElement("tbody"));
    let trow;
    let tcell;
    let innerCellTreble;
    let innerRowTreble;
    let innerCellBass;
    let innerRowBass;
    let label;
    let labelRow;
    let innerTable;
    let innerTbody;
    while (effettiveChords[i] != null) {
      if (i % 4 === 0) {
        trow = tbody.appendChild(document.createElement("tr"));
      }
      tcell = trow.appendChild(document.createElement("td"));
      tcell.style.border = "3px solid black";
      tcell.style.borderRadius = "5px";
      innerTable = tcell.appendChild(document.createElement("table"));
      innerTbody = innerTable.appendChild(document.createElement("tbody"));
      labelRow = innerTbody.appendChild(document.createElement("tr"));
      innerRowTreble = innerTbody.appendChild(document.createElement("tr"));
      innerCellTreble = innerRowTreble.appendChild(document.createElement("td"));
      innerRowBass = innerTbody.appendChild(document.createElement("tr"));
      innerCellBass = innerRowBass.appendChild(document.createElement("td"));
      label = labelRow.appendChild(document.createElement("td"));

      [treble, bass] = effettiveChords[i].drawScore({ treble: innerCellTreble, bass: innerCellBass });

      if (!treble) {
        innerCellTreble.classList.add("hidden");
      }
      if (!bass) {
        innerCellBass.classList.add("hidden");
      }
      label.textContent = effettiveChords[i].name;
      i++;
    }

    scope.appendChild(tableHtmlContent);
    scope.appendChild(keySignature);
    scope.appendChild(modalContent);
    scope.appendChild(voiceNameContent);
    scope.appendChild(voiceTypeContent);
    scope.appendChild(chordScope);
    scope.appendChild(scoreCont);

    let oHideFrame = document.createElement("iframe");
    oHideFrame.style.position = "fixed";
    oHideFrame.style.right = "0";
    oHideFrame.style.bottom = "0";
    oHideFrame.style.width = "0";
    oHideFrame.style.height = "0";
    oHideFrame.style.border = "0";
    document.body.appendChild(oHideFrame);
    oHideFrame.appendChild(scope);

    let oDoc = oHideFrame.contentWindow || oHideFrame.contentDocument;
    if (oDoc.document) oDoc = oDoc.document;
    this.writePage(oDoc, oHideFrame.innerHTML);
    oDoc.close();
  }

  /**
   * This function creates a html page under the original one and opens the printing prompt
   */
  writePage(document, innerHTML) {
    document.write('<head><link type="text/css" rel="stylesheet" href="../../App.css"><title>Chords</title></head>');
    document.write('<body onload="this.focus(); this.print();">');
    document.write(innerHTML + "</body>");
  }

  render() {
    return <div title="Print the chords" className={"printer-button "} onClick={this.print} />;
  }
}

export default PrinterButton;
