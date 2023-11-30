import { ClashSelectionSetManager } from './ClashSelectionSetManager';
import { ClashStageManager } from './ClashStageManager';

const selectionSetsList = document.getElementById(
  'selection-sets-list'
) as HTMLUListElement;
const selectionSetsForm = document.getElementById(
  'selection-sets-form'
) as HTMLFormElement;

const clashStageList = document.getElementById(
  'clash-stage-list'
) as HTMLUListElement;

const selectionSetManager = new ClashSelectionSetManager(selectionSetsForm, selectionSetsList);
new ClashStageManager(clashStageList, selectionSetManager.selectionSets);
