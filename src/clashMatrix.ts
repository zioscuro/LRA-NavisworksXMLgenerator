export function buildClashMatrix(clashMatrix: HTMLTableElement, SelectionSetsArray: string[]) {
  const clashMatrixThead = clashMatrix.querySelector("thead") as HTMLTableSectionElement;
  const clashMatrixTbody = clashMatrix.querySelector("tbody") as HTMLTableSectionElement;

  const rowHeader = document.createElement("tr");

  const blankHeader = document.createElement("th");
  blankHeader.textContent = "";

  rowHeader.appendChild(blankHeader);

  for (const group of SelectionSetsArray) {
    const header = document.createElement("th");
    header.textContent = group;

    rowHeader.appendChild(header);
  }

  clashMatrixThead.appendChild(rowHeader);

  for (const groupSelectionA of SelectionSetsArray) {
    const row = document.createElement("tr");
    const header = document.createElement("th");
    header.textContent = groupSelectionA;

    row.appendChild(header);

    for (const groupSelectionB of SelectionSetsArray) {
      const tdCell = document.createElement("td");
      tdCell.setAttribute("data-selection-left", groupSelectionA);
      tdCell.setAttribute("data-selection-right", groupSelectionB);

      const groupCheckbox = document.createElement("input");
      groupCheckbox.type = "checkbox";
      groupCheckbox.checked = false;

      if (tdCell.dataset.selectionLeft === tdCell.dataset.selectionRight) {
        groupCheckbox.disabled = true;
      }

      tdCell.appendChild(groupCheckbox);
      row.appendChild(tdCell);
    }

    clashMatrixTbody.appendChild(row);
  }
}

export function resetClashMatrix(clashMatrix: HTMLTableElement) {
  const clashMatrixThead = clashMatrix.querySelector("thead") as HTMLTableSectionElement;
  const clashMatrixTbody = clashMatrix.querySelector("tbody") as HTMLTableSectionElement;

  clashMatrixThead.innerHTML = "";
  clashMatrixTbody.innerHTML = "";
}
