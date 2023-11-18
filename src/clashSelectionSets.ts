export const selectionSetsArray: string[] = [];

export function clashSelectionSetManager(clashGroupInput: HTMLInputElement, clashGroupList: HTMLUListElement) {
  const newClashGroupElement = document.createElement('li');

  const newClashGroupDescription = document.createElement('span');
  const newClashGroupCancBtn = document.createElement('button');

  newClashGroupDescription.textContent = clashGroupInput.value;
  newClashGroupCancBtn.textContent = 'X';

  newClashGroupElement.appendChild(newClashGroupDescription);
  newClashGroupElement.appendChild(newClashGroupCancBtn);

  selectionSetsArray.push(newClashGroupDescription.textContent);

  clashGroupList.appendChild(newClashGroupElement);

  clashGroupInput.value = '';

  newClashGroupCancBtn.addEventListener('click', (e: MouseEvent) => {
    const selectedCancBtn = e.target as HTMLButtonElement
    const selectedClashGroup = selectedCancBtn.parentElement;

    if (!selectedClashGroup) return;

    const selectedClashGroupDescription =
      selectedClashGroup.querySelector('span') as HTMLSpanElement;

    if (!selectedClashGroupDescription.textContent) return;

    const selectecClashGroupIndex = selectionSetsArray.indexOf(
      selectedClashGroupDescription.textContent
    );

    clashGroupList.removeChild(selectedClashGroup);
    selectionSetsArray.splice(selectecClashGroupIndex, 1);
  });
}