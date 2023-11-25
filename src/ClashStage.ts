export class ClashStage {
  stageList: HTMLUListElement;
  stageElement: HTMLElement;

  constructor(stageList: HTMLUListElement) {
    this.stageList = stageList;
    this.stageElement = this.stageSetup();
    this.renderUI();
    this.setupListeners();
  }

  stageSetup() {
    const newStage = document.createElement('li');

    newStage.innerHTML = `
      <li class="clash-stage">
        <div class="clash-stage-header">
          <h3>Stage</h3>
          <button class="remove-stage-btn">-</button>
          <button class="add-stage-btn">+</button>
        </div>
      </li>    
    `;

    return newStage;
  }

  addStage() {
    console.log('add stage')
  }

  removeStage() {
    console.log('remove stage')
  }

  renderUI() {
    this.stageList.appendChild(this.stageElement)
  }

  setupListeners() {
    const addBtn = this.stageElement.querySelector('.add-stage-btn')
    const removeBtn = this.stageElement.querySelector('.remove-stage-btn')

    if (addBtn instanceof HTMLButtonElement && removeBtn instanceof HTMLButtonElement) {
      addBtn.addEventListener('click', this.addStage)
      removeBtn.addEventListener('click', this.removeStage)
    }


  }
}
