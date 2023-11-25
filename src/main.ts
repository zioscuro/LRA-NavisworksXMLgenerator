import { clashSelectionSetManager } from './clashSelectionSets';
import { addSection } from './clashStageManager';

const clashGroupList = document.getElementById(
  'clash-group-list'
) as HTMLUListElement;
const clashGroupForm = document.getElementById(
  'clash-group-form'
) as HTMLFormElement;

clashGroupForm.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  const data = new FormData(clashGroupForm);
  const clashGroupName = data.get('clash-group') as string;

  if (!clashGroupName) {
    return;
  }
  clashSelectionSetManager(clashGroupName, clashGroupList);

  clashGroupForm.reset();
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
