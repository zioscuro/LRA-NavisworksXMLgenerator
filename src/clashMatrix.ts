import { clashMatrixLC2thead, clashMatrixLC2tbody } from "./main";
import { clashGroups } from "./clashGroups";

export function buildClashMatrix() {
  const rowHeader = document.createElement('tr');

  const blankHeader = document.createElement('th');
  blankHeader.textContent = '';

  rowHeader.appendChild(blankHeader);

  for (const group of clashGroups) {
    const header = document.createElement('th');
    header.textContent = group;

    rowHeader.appendChild(header);
  }

  clashMatrixLC2thead.appendChild(rowHeader);

  for (const groupSelectionA of clashGroups) {
    const row = document.createElement('tr');
    const header = document.createElement('th');
    header.textContent = groupSelectionA;

    row.appendChild(header);

    for (const groupSelectionB of clashGroups) {
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

    clashMatrixLC2tbody.appendChild(row);
  }
}