const btn = document.querySelector('#export-LC1');
const listaGruppi = document.querySelector('ul');
const formGruppi = document.querySelector('#from-gruppi-selezione');
const inputGruppoSelezione = document.querySelector('#input-gruppo-selezione');
const aggiungiGruppoSelezione = document.querySelector(
  '#aggiungi-gruppo-selezione'
);

const btnGeneraLC2 = document.querySelector('#genera-LC2');

const clashGroups = [];

const xmlHeader = `<?xml version="1.0" encoding="UTF-8" ?>

<exchange xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://download.autodesk.com/us/navisworks/schemas/nw-exchange-12.0.xsd" units="ft" filename="" filepath="">
  <batchtest name="R020_CORDINAMENTO_PFTE" internal_name="R020_CORDINAMENTO_PFTE" units="ft">
    <clashtests>
`;

const xmlFooter = `</clashtests>
<selectionsets/>
</batchtest>
</exchange>`;

function testDefinition(nome, tipo, tolleranza, autointersecante, clashgroup) {
  return `<clashtest name="${nome}" test_type="${tipo}" status="new" tolerance="${tolleranza}" merge_composites="1">
  <linkage mode="none"/>
  <left>
    <clashselection selfintersect="${autointersecante}" primtypes="1">
      <locator>lcop_selection_set_tree/${clashgroup}</locator>
    </clashselection>
  </left>
  <rules/>
</clashtest>
`;
}

function writeXML() {
  let output = xmlHeader;

  for (const group of clashGroups) {
    output += testDefinition(
      `${clashGroups.indexOf(group) + 1}_LC1-STAGE1_${group}`,
      'duplicate',
      '0.1640419948',
      '1',
      group
    );
  }

  for (const group of clashGroups) {
    output += testDefinition(
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

btn.addEventListener('click', () => {
  download('fileXML', writeXML());
});

aggiungiGruppoSelezione.addEventListener('click', (e) => {
  e.preventDefault();

  const nuovoGruppo = document.createElement('li');

  const descrizioneGruppo = document.createElement('span');
  const cancBtn = document.createElement('button');

  descrizioneGruppo.textContent = inputGruppoSelezione.value;
  cancBtn.textContent = 'X';

  nuovoGruppo.appendChild(descrizioneGruppo);
  nuovoGruppo.appendChild(cancBtn);

  clashGroups.push(descrizioneGruppo.textContent);

  listaGruppi.appendChild(nuovoGruppo);

  inputGruppoSelezione.value = '';

  cancBtn.addEventListener('click', (e) => {
    const gruppo = e.target.parentElement;

    const descrizioneGruppo = gruppo.querySelector('span');
    const removedGroupIndex = clashGroups.indexOf(
      descrizioneGruppo.textContent
    );

    listaGruppi.removeChild(gruppo);
    clashGroups.splice(removedGroupIndex, 1);
  });
});

const matriceLV2 = document.getElementById('matrice-LC2');
const matriceLV2thead = matriceLV2.querySelector('thead');
const matriceLV2tbody = matriceLV2.querySelector('tbody');

btnGeneraLC2.addEventListener('click', () => {
  const rigaHeader = document.createElement('tr');

  const blankHeader = document.createElement('th');
  blankHeader.textContent = '';

  rigaHeader.appendChild(blankHeader);

  for (const group of clashGroups) {
    const header = document.createElement('th');
    header.textContent = group;

    rigaHeader.appendChild(header);
  }

  matriceLV2thead.appendChild(rigaHeader);

  for (const group of clashGroups) {
    const riga = document.createElement('tr');
    const header = document.createElement('th');
    header.textContent = group;

    riga.appendChild(header);

    clashGroups.forEach(() => {
      const tdCella = document.createElement('td');
      const checkGroup = document.createElement('input');
      checkGroup.type = 'checkbox';

      tdCella.appendChild(checkGroup);
      riga.appendChild(tdCella);
    })

    matriceLV2tbody.appendChild(riga);

    btnGeneraLC2.remove();
  }
});
