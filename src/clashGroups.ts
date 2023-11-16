export const clashGroups: string[] = [];

export function clashGroupManager(clashGroupInput: HTMLInputElement, clashGroupList: HTMLUListElement) {
  const newClashGroupElement = document.createElement('li');

  const newClashGroupDescription: any = document.createElement('span');
  const newClashGroupCancBtn = document.createElement('button');

  newClashGroupDescription.textContent = clashGroupInput.value;
  newClashGroupCancBtn.textContent = 'X';

  newClashGroupElement.appendChild(newClashGroupDescription);
  newClashGroupElement.appendChild(newClashGroupCancBtn);

  clashGroups.push(newClashGroupDescription.textContent);

  clashGroupList.appendChild(newClashGroupElement);

  clashGroupInput.value = '';

  newClashGroupCancBtn.addEventListener('click', (e: any) => {
    const selectedClashGroup = e.target.parentElement;

    const selectedClashGroupDescription =
      selectedClashGroup.querySelector('span');
    const selectecClashGroupIndex = clashGroups.indexOf(
      selectedClashGroupDescription.textContent
    );

    clashGroupList.removeChild(selectedClashGroup);
    clashGroups.splice(selectecClashGroupIndex, 1);
  });
}