import { downloadXml } from "./utils";
import { writeXmlLC1, writeXmlLC2 } from "./clashXMLwriter";
import { buildClashMatrix, resetClashMatrix } from "./clashMatrix";
import { clashSelectionSetManager, selectionSetsArray } from "./clashSelectionSets";

const btnExportLC1 = document.getElementById(
  "btn-export-LC1"
) as HTMLButtonElement;
const btnExportLC2 = document.getElementById(
  "btn-export-LC2"
) as HTMLButtonElement;
const btnGenerateClashMatrix = document.getElementById(
  "btn-generate-clashmatrix"
) as HTMLButtonElement;
const btnRefreshClashMatrix = document.getElementById(
  "btn-refresh-clashmatrix"
) as HTMLButtonElement;

const clashGroupInput = document.getElementById(
  "clash-group-input"
) as HTMLInputElement;
const clashGroupList = document.getElementById(
  "clash-group-list"
) as HTMLUListElement;
const clashGroupAddBtn = document.getElementById(
  "add-clash-group-input"
) as HTMLButtonElement;

const clashMatrixLC2 = document.getElementById(
  "clashMatrix-LC2"
) as HTMLTableElement;

clashGroupAddBtn.addEventListener("click", (e: Event) => {
  e.preventDefault();

  clashSelectionSetManager(clashGroupInput, clashGroupList);

  btnExportLC2.disabled = true;
});

btnGenerateClashMatrix.addEventListener("click", () => {
  buildClashMatrix(clashMatrixLC2, selectionSetsArray);

  btnGenerateClashMatrix.remove();

  btnRefreshClashMatrix.disabled = false;
  btnRefreshClashMatrix.style.display = "block";
  btnExportLC2.disabled = false;
});

btnRefreshClashMatrix.addEventListener("click", () => {
  resetClashMatrix(clashMatrixLC2);

  buildClashMatrix(clashMatrixLC2, selectionSetsArray);

  btnExportLC2.disabled = false;
});

btnExportLC1.addEventListener("click", () => {
  downloadXml("fileXML-LC1", writeXmlLC1());
});

btnExportLC2.addEventListener("click", () => {
  downloadXml("fileXML-LC2", writeXmlLC2(clashMatrixLC2));
});
