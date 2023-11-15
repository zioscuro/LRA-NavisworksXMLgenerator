const btnExportLC1: any = document.getElementById('btn-export-LC1');
const btnExportLC2: any = document.getElementById('btn-export-LC2');
const btnGenerateClashMatrix: any = document.getElementById(
  'btn-generate-clashmatrix');
const btnRefreshClashMatrix: any = document.getElementById('btn-refresh-clashmatrix')

const clashGroupList: any = document.getElementById('clash-group-list');
const clashGroupInput: any = document.getElementById('clash-group-input');
const clashGroupAddBtn: any = document.getElementById('add-clash-group-input');

const clashMatrixLC2: any = document.getElementById('matrice-LC2');
const clashMatrixLC2thead: any = clashMatrixLC2.querySelector('thead');
const clashMatrixLC2tbody: any = clashMatrixLC2.querySelector('tbody');

const clashGroups: string[] = [];

const XML_HEADER = `<?xml version="1.0" encoding="UTF-8" ?>

<exchange xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://download.autodesk.com/us/navisworks/schemas/nw-exchange-12.0.xsd" units="ft" filename="" filepath="">
  <batchtest name="LRA-NavisworksXMLgenerator" internal_name="LRA-NavisworksXMLgenerator" units="ft">
    <clashtests>
`;

const XML_FOOTER = `</clashtests>
<selectionsets/>
</batchtest>
</exchange>`;

function generateClashTestLC1(
  name: any,
  type: any,
  tollerance: any,
  autointersect: any,
  clashgroup: any
) {
  const clashTestDefinition = `<clashtest name="${name}" test_type="${type}" status="new" tolerance="${tollerance}" merge_composites="1">
  <linkage mode="none"/>
  <left>
    <clashselection selfintersect="${autointersect}" primtypes="1">
      <locator>lcop_selection_set_tree/${clashgroup}</locator>
    </clashselection>
  </left>
  <rules/>
</clashtest>
`;

  return clashTestDefinition;
}

function generateClashTestLC2(number: any, name: any, clashgroupsLeft: any, clashgroupsRight: any) {
  const clashTestDefinition = `<clashtest name="${number}-LC2_${name}" test_type="hard" status="new" tolerance="0.1640419948" merge_composites="1">
  <linkage mode="none"/>
  <left>    
    ${defineClashSelection(clashgroupsLeft)}
  </left>
  <right>
    ${defineClashSelection(clashgroupsRight)}
  </right>
  <rules/>
</clashtest>
`;

  return clashTestDefinition;
}

function defineClashSelection(clashGroupsArray: any) {
  let clashSelection = `<clashselection selfintersect="0" primtypes="1">
  <locator>`;

  clashGroupsArray.forEach((group: any) => {
    clashSelection += `lcop_selection_set_tree/${group};`;
  });

  clashSelection = clashSelection.slice(0, -1);

  clashSelection += `</locator>
  </clashselection>`;

  return clashSelection;
}

function writeXmlLC1() {
  let output = XML_HEADER;

  for (const group of clashGroups) {
    output += generateClashTestLC1(
      `${clashGroups.indexOf(group) + 1}_LC1-STAGE1_${group}`,
      'duplicate',
      '0.1640419948',
      '1',
      group
    );
  }

  for (const group of clashGroups) {
    output += generateClashTestLC1(
      `${clashGroups.indexOf(group) + 1}_LC1-STAGE2_${group}`,
      'hard',
      '0.1640419948',
      '1',
      group
    );
  }

  output += XML_FOOTER;

  return output;
}

function writeXmlLC2() {
  let output = XML_HEADER;

  const checkedRows = [...clashMatrixLC2tbody.querySelectorAll('tr:has(input:checked)')];

  checkedRows.forEach((tr) => {
    const reportNumber = checkedRows.indexOf(tr) + 1;
    const selectionLeft: string[] = [];
    const selectionRight: string[] = [];

    const rowHeader = tr.querySelector('th').textContent;

    selectionLeft.push(rowHeader);

    tr.querySelectorAll('td:has(input:checked)').forEach((td: any) => {
      selectionRight.push(td.dataset.selectionRight);
    });

    output += generateClashTestLC2(
      reportNumber,
      rowHeader,
      selectionLeft,
      selectionRight
    );
  });

  output += XML_FOOTER;

  return output
}

function downloadXml(filename: string, text: string) {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/xml;charset=utf-8,' + encodeURIComponent(text)
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function buildClashMatrix() {
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

clashGroupAddBtn.addEventListener('click', (e: any) => {  
  e.preventDefault();

  const newClashGroup = document.createElement('li');

  const newClashGroupDescription: any = document.createElement('span');
  const newClashGroupCancBtn = document.createElement('button');

  newClashGroupDescription.textContent = clashGroupInput.value;
  newClashGroupCancBtn.textContent = 'X';

  newClashGroup.appendChild(newClashGroupDescription);
  newClashGroup.appendChild(newClashGroupCancBtn);

  clashGroups.push(newClashGroupDescription.textContent);

  clashGroupList.appendChild(newClashGroup);

  clashGroupInput.value = '';

  newClashGroupCancBtn.addEventListener('click', (e: any) => {
    const selectedClashGroup = e.target.parentElement;

    const selectedClashGroupDescription =
      selectedClashGroup.querySelector('span');
    const selectecClashGroupIndex = clashGroups.indexOf(
      selectedClashGroupDescription.textContent
    );

    clashGroupList.removeChild(selectedClashGroup);
    clashGroups.splice(selectecClashGroupIndex, 1);
  });

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
  downloadXml('fileXML-LC2', writeXmlLC2());
});