import { SelectionSetManager } from './SelectionSetManager';
import { StageManager } from './StageManager';

const selectionSetsList = document.getElementById(
  'selection-sets-list'
) as HTMLUListElement;
const selectionSetsForm = document.getElementById(
  'selection-sets-form'
) as HTMLFormElement;

const clashStageList = document.getElementById(
  'clash-stage-list'
) as HTMLUListElement;

const selectionSetManager = new SelectionSetManager(selectionSetsForm, selectionSetsList);
new StageManager(clashStageList, selectionSetManager.selectionSets);
