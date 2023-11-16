import {generateClashTestLC1,generateClashTestLC2} from "./clashGenerator"
import { clashGroups } from "./clashGroups";


const XML_HEADER = `<?xml version="1.0" encoding="UTF-8" ?>

<exchange xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://download.autodesk.com/us/navisworks/schemas/nw-exchange-12.0.xsd" units="ft" filename="" filepath="">
  <batchtest name="LRA-NavisworksXMLgenerator" internal_name="LRA-NavisworksXMLgenerator" units="ft">
    <clashtests>
`;

const XML_FOOTER = `</clashtests>
<selectionsets/>
</batchtest>
</exchange>`;

export function writeXmlLC1() {
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

export function writeXmlLC2(clashMatrix: HTMLTableElement) {
  let output = XML_HEADER;

  const checkedRows = [...clashMatrix.querySelectorAll('tr:has(input:checked)')];

  checkedRows.forEach((tr:any) => {
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