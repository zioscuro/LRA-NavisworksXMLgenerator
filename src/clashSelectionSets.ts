export const selectionSetsArray: string[] = [];

export function clashSelectionSetManager(clashGroupName: string, clashGroupList: HTMLUListElement) {
  
  selectionSetsArray.push(clashGroupName);  

  const newClashGroupElement = document.createElement('li');

  const newClashGroupDescription = document.createElement('span');
  newClashGroupDescription.textContent = clashGroupName;

  const newClashGroupCancBtn = document.createElement('button');
  newClashGroupCancBtn.textContent = 'X';

  newClashGroupElement.appendChild(newClashGroupDescription);
  newClashGroupElement.appendChild(newClashGroupCancBtn);

  clashGroupList.appendChild(newClashGroupElement);

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