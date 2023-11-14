const btnExportLC1 = document.getElementById('btn-export-LC1');
const btnExportLC2 = document.getElementById('btn-export-LC2');
const btnGenerateClashMatrix = document.getElementById(
  'btn-generate-clashmatrix'
);

const clashGroupList = document.getElementById('clash-group-list');
const clashGroupForm = document.getElementById('clash-group-form');
const clashGroupInput = document.getElementById('clash-group-input');
const clashGroupAddBtn = document.getElementById('add-clash-group-input');

const clashMatrixLC2 = document.getElementById('matrice-LC2');
const clashMatrixLC2thead = clashMatrixLC2.querySelector('thead');
const clashMatrixLC2tbody = clashMatrixLC2.querySelector('tbody');

const clashGroups = [];

const xmlHeader = `<?xml version="1.0" encoding="UTF-8" ?>

<exchange xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://download.autodesk.com/us/navisworks/schemas/nw-exchange-12.0.xsd" units="ft" filename="" filepath="">
  <batchtest name="LRA-NavisworksXMLgenerator" internal_name="LRA-NavisworksXMLgenerator" units="ft">
    <clashtests>
`;

const xmlFooter = `</clashtests>
<selectionsets/>
</batchtest>
</exchange>`;

function generateClashTest(
  nome,
  tipo,
  tolleranza,
  autointersecante,
  clashgroup
) {
  const clashTestDefinition = `<clashtest name="${nome}" test_type="${tipo}" status="new" tolerance="${tolleranza}" merge_composites="1">
  <linkage mode="none"/>
  <left>
    <clashselection selfintersect="${autointersecante}" primtypes="1">
      <locator>lcop_selection_set_tree/${clashgroup}</locator>
    </clashselection>
  </left>
  <rules/>
</clashtest>
`;

  return clashTestDefinition;
}

function writeXML() {
  let output = xmlHeader;

  for (const group of clashGroups) {
    output += generateClashTest(
      `${clashGroups.indexOf(group) + 1}_LC1-STAGE1_${group}`,
      'duplicate',
      '0.1640419948',
      '1',
      group
    );
  }

  for (const group of clashGroups) {
    output += generateClashTest(
      `${clashGroups.indexOf(group) + 1}_LC1-STAGE2_${group}`,
      'hard',
      '0.1640419948',
      '1',
      group
    );
  }

  output += xmlFooter;

  return output;
}

function download(filename, text) {
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

btnExportLC1.addEventListener('click', () => {
  download('fileXML', writeXML());
});

clashGroupAddBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const newClashGroup = document.createElement('li');

  const newClashGroupDescription = document.createElement('span');
  const newClashGroupCancBtn = document.createElement('button');

  newClashGroupDescription.textContent = clashGroupInput.value;
  newClashGroupCancBtn.textContent = 'X';

  newClashGroup.appendChild(newClashGroupDescription);
  newClashGroup.appendChild(newClashGroupCancBtn);

  clashGroups.push(newClashGroupDescription.textContent);

  clashGroupList.appendChild(newClashGroup);

  clashGroupInput.value = '';

  newClashGroupCancBtn.addEventListener('click', (e) => {
    const selectedClashGroup = e.target.parentElement;

    const selectedClashGroupDescription =
      selectedClashGroup.querySelector('span');
    const selectecClashGroupIndex = clashGroups.indexOf(
      selectedClashGroupDescription.textContent
    );

    clashGroupList.removeChild(selectedClashGroup);
    clashGroups.splice(selectecClashGroupIndex, 1);
  });
});

btnGenerateClashMatrix.addEventListener('click', () => {
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

  for (const group of clashGroups) {
    const row = document.createElement('tr');
    const header = document.createElement('th');
    header.textContent = group;

    row.appendChild(header);

    clashGroups.forEach(() => {
      const tdCell = document.createElement('td');
      const groupCheckbox = document.createElement('input');
      groupCheckbox.type = 'checkbox';

      tdCell.appendChild(groupCheckbox);
      row.appendChild(tdCell);
    });

    clashMatrixLC2tbody.appendChild(row);

    btnGenerateClashMatrix.remove();

    btnExportLC2.disabled = false;
  }
});
