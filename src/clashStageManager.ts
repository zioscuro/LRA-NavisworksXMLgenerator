import { ClashStage } from './ClashStage';

export class ClashStageManager {
  stageContainer: HTMLUListElement;
  stageList: ClashStage[] = [];

  constructor(stageContainer: HTMLUListElement) {
    this.stageContainer = stageContainer;

    const firstStage = new ClashStage(this);
    this.stageList.push(firstStage);

    this.renderUI();
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

  exportXML() {}
}
