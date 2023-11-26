import { ClashStageManager } from "./ClashStageManager";

export class ClashStage {
  stageElement: HTMLElement;
  stageManager: ClashStageManager

  constructor(manager: ClashStageManager) {
    this.stageManager = manager
    this.stageElement = document.createElement('li');
    this.stageElement.innerHTML = `
    <li class="clash-stage">
      <div class="clash-stage-header">
        <h3>Stage</h3>
        <button class="remove-stage-btn">-</button>
        <button class="add-stage-btn">+</button>
      </div>
    </li>    
    `;    
    this.setupListeners();
  }

  addStage() {
    this.stageManager.addStage()
  }

  removeStage() {
    this.stageManager.removeStage(this)
  }

  setupListeners() {
    const addBtn = this.stageElement.querySelector('.add-stage-btn')
    const removeBtn = this.stageElement.querySelector('.remove-stage-btn')

    if (addBtn instanceof HTMLButtonElement && removeBtn instanceof HTMLButtonElement) {
      addBtn.addEventListener('click', this.addStage.bind(this))
      removeBtn.addEventListener('click', this.removeStage.bind(this))
    }
  }
}
