import { buildClashMatrix } from "./clashMatrix";
import { selectionSetsArray } from "./clashSelectionSets";

export function addSection(stageList: HTMLElement, currentStage: HTMLElement) {
  stageList.appendChild(currentStage.cloneNode(true));

  currentStage = stageList.querySelector(
    '.clash-section:last-child'
  ) as HTMLButtonElement;

  const addBtn = stageList.querySelector(
    '.clash-section:last-child .add-section-btn'
  ) as HTMLButtonElement;
  const removeBtn = stageList.querySelector(
    '.clash-section:last-child .remove-section-btn'
  ) as HTMLButtonElement;

  if (removeBtn.disabled) {
    removeBtn.disabled = false;
  }

  addBtn?.addEventListener('click', () => {
    addSection(stageList, currentStage);
  });
  removeBtn.addEventListener('click', removeSection);
}

function removeSection(e: MouseEvent) {
  const removedBtn = e.target as HTMLButtonElement;
  const removedSection = removedBtn.parentNode?.parentNode as HTMLElement;
  const currentSectionList = removedSection.parentNode as HTMLElement;

  currentSectionList.removeChild(removedSection);

  const clashTestSectionsArray = [
    ...document.querySelectorAll('.clash-section'),
  ];

  if (clashTestSectionsArray.length === 1) {
    const clashFirstSectionAddBtn = clashTestSectionsArray[0].querySelector(
      '.add-section-btn'
    ) as HTMLButtonElement;
    clashFirstSectionAddBtn.disabled = false;
  }
}

const optionsBtn = document.querySelector('.stage-options-btn') as HTMLButtonElement

optionsBtn.addEventListener('click', () => {
  const optionsModal = document.getElementById('modal-stage') as HTMLDialogElement
  
  optionsModal.showModal()

  optionsModal.addEventListener('click', () => {optionsModal.close()})
})

const stageClashMatrix = document.querySelector('.stage-clashmatrix') as HTMLTableElement
const generateClashMatrixBtn = document.querySelector('.stage-gen-clashmatrix-btn') as HTMLButtonElement
const refreshClashMatrixBtn = document.querySelector('.stage-refresh-clashmatrix-btn') as HTMLButtonElement

generateClashMatrixBtn.addEventListener('click', () => {
  buildClashMatrix(stageClashMatrix, selectionSetsArray)
  generateClashMatrixBtn.disabled = true;
  refreshClashMatrixBtn.disabled = false;
})
