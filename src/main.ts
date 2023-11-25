import { downloadXml } from './utils';
import { writeXmlLC1, writeXmlLC2 } from './clashXMLwriter';
import { buildClashMatrix, resetClashMatrix } from './clashMatrix';
import { clashSelectionSetManager, selectionSetsArray} from './clashSelectionSets';
import { addSection } from './clashStageManager';

const clashGroupInput = document.getElementById(
  'clash-group-input'
) as HTMLInputElement;
const clashGroupList = document.getElementById(
  'clash-group-list'
) as HTMLUListElement;
const clashGroupAddBtn = document.getElementById(
  'add-clash-group-input'
) as HTMLButtonElement;

clashGroupAddBtn.addEventListener('click', (e: Event) => {
  e.preventDefault();

  if (!clashGroupInput.value) {return}

  clashSelectionSetManager(clashGroupInput, clashGroupList);
});

// CLASH SECTIONS LIST (WORK IN PROGRESS)

const clashSectionList = document.querySelector(
  '#clash-section-list'
) as HTMLElement;
let currentClashStage = document.querySelector('.clash-section') as HTMLElement;

const clashFirstSectionAddBtn = currentClashStage.querySelector(
  '.add-section-btn'
) as HTMLButtonElement;

clashFirstSectionAddBtn?.addEventListener('click', () => {
  addSection(clashSectionList, currentClashStage);
  clashFirstSectionAddBtn.disabled = true;
});
