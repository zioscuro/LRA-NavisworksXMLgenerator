import { downloadXml } from "./utils";
import { writeXmlLC1, writeXmlLC2 } from "./clashXMLwriter";
import { buildClashMatrix } from "./clashMatrix";
import { clashGroupManager } from "./clashGroups";

export const btnExportLC1: any = document.getElementById('btn-export-LC1');
export const btnExportLC2: any = document.getElementById('btn-export-LC2');
const btnGenerateClashMatrix: any = document.getElementById(
  'btn-generate-clashmatrix');
const btnRefreshClashMatrix: any = document.getElementById('btn-refresh-clashmatrix')

export const clashGroupList: any = document.getElementById('clash-group-list');
export const clashGroupInput: any = document.getElementById('clash-group-input');
const clashGroupAddBtn: any = document.getElementById('add-clash-group-input');

const clashMatrixLC2: any = document.getElementById('matrice-LC2');
export const clashMatrixLC2thead: any = clashMatrixLC2.querySelector('thead');
export const clashMatrixLC2tbody: any = clashMatrixLC2.querySelector('tbody');

clashGroupAddBtn.addEventListener('click', (e: any) => {  
  e.preventDefault();

  clashGroupManager()

  btnExportLC2.disabled=true;
});

btnGenerateClashMatrix.addEventListener('click', () => {
  buildClashMatrix();  

  btnGenerateClashMatrix.remove();

  btnRefreshClashMatrix.disabled =false;
  btnRefreshClashMatrix.style.display = "block"
  btnExportLC2.disabled = false;
});

btnRefreshClashMatrix.addEventListener('click', () => {
  clashMatrixLC2thead.innerHTML="";
  clashMatrixLC2tbody.innerHTML="";

  buildClashMatrix();
  
  btnExportLC2.disabled=false;
})

btnExportLC1.addEventListener('click', () => {
  downloadXml('fileXML-LC1', writeXmlLC1());
});

btnExportLC2.addEventListener('click', () => {  
  downloadXml('fileXML-LC2', writeXmlLC2(clashMatrixLC2tbody));
});