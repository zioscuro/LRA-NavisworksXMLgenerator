import { clashSelectionSetManager } from './clashSelectionSets';
import { ClashStageManager } from './ClashStageManager';

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

const clashStageList = document.getElementById(
  'clash-stage-list'
) as HTMLUListElement;

new ClashStageManager(clashStageList);
