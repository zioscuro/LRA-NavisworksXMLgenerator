import { ClashStage } from './ClashStage';

export class ClashMatrix {
  parentStage: ClashStage;
  matrixElement: HTMLTableElement;

  constructor(parent: ClashStage) {
    this.parentStage = parent;
    this.matrixElement = document.createElement('table');
  }

  renderDuplicateMatrix() {
    this.matrixElement.innerHTML = '';
    this.buildClashMatrix();
    this.parentStage.stageElement.appendChild(this.matrixElement);
    console.log('render matrice duplicati');
  }

  renderIntersectionsMatrix() {
    this.matrixElement.innerHTML = '';
    this.buildClashMatrix();
    this.parentStage.stageElement.appendChild(this.matrixElement);
    console.log('render matrice intersezioni');
  }

  buildClashMatrix() {
    const selectionSets = this.parentStage.stageManager.selectionSets;

    if (selectionSets.length <= 1) {
      return;
    }

    const clashMatrixThead = this.matrixElement.createTHead();
    const clashMatrixTbody = this.matrixElement.createTBody();

    const rowHeader = document.createElement('tr');

    const blankHeader = document.createElement('th');
    blankHeader.textContent = '';

    rowHeader.appendChild(blankHeader);

    for (const group of selectionSets) {
      const header = document.createElement('th');
      header.textContent = group;

      rowHeader.appendChild(header);
    }

    clashMatrixThead.appendChild(rowHeader);

    for (const groupSelectionA of selectionSets) {
      const row = document.createElement('tr');
      const header = document.createElement('th');
      header.textContent = groupSelectionA;

      row.appendChild(header);

      for (const groupSelectionB of selectionSets) {
        const tdCell = document.createElement('td');
        tdCell.setAttribute('data-selection-left', groupSelectionA);
        tdCell.setAttribute('data-selection-right', groupSelectionB);

        const groupCheckbox = document.createElement('input');
        groupCheckbox.type = 'checkbox';
        groupCheckbox.checked = false;

        if (tdCell.dataset.selectionLeft === tdCell.dataset.selectionRight) {
          groupCheckbox.disabled = true;
        }

        tdCell.appendChild(groupCheckbox);
        row.appendChild(tdCell);
      }

      clashMatrixTbody.appendChild(row);

      this.parentStage.stageElement.appendChild(this.matrixElement);
    }
  }
}
