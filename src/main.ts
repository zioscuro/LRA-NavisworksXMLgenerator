import { clashSelectionSetManager } from './clashSelectionSets';
import { addSection } from './clashStageManager';

const selectionSetsList = document.getElementById(
  'selection-sets-list'
) as HTMLUListElement;
const selectionSetsForm = document.getElementById(
  'selection-sets-form'
) as HTMLFormElement;

selectionSetsForm.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  const data = new FormData(selectionSetsForm);
  const selectionSetName = data.get('selection-set') as string;

  if (!selectionSetName) {
    return;
  }
  clashSelectionSetManager(selectionSetName, selectionSetsList);

  selectionSetsForm.reset();
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
