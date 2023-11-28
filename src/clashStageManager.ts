import { ClashStage } from './ClashStage';

export class ClashStageManager {
  stageContainer: HTMLUListElement;
  stageList: ClashStage[] = [];

  constructor(stageContainer: HTMLUListElement) {
    this.stageContainer = stageContainer;

    const firstStage = new ClashStage(this);
    this.stageList.push(firstStage);

    this.setupListeners();
    this.renderUI();
  }

  setupListeners() {
    const exportBtn = document.getElementById('btn-export-xml')

    if (exportBtn instanceof HTMLButtonElement) {
      exportBtn.addEventListener('click', this.exportXML.bind(this))
    }
  }

  renderUI() {
    this.stageContainer.innerHTML = '';
    for (const stage of this.stageList) {
      this.stageContainer.appendChild(stage.stageElement);
    }
  }

  addStage() {
    const newStage = new ClashStage(this);
    this.stageList.push(newStage);
    this.renderUI();
  }

  removeStage(removedStage: ClashStage) {
    if (this.stageList.length === 1) {
      return;
    }

    const removedStageIndex = this.stageList.indexOf(removedStage);
    this.stageList.splice(removedStageIndex, 1);
    this.renderUI();
  }

  exportXML() {
    console.log('export XML')
  }
}
