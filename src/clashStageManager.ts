import { ClashStage } from "./ClashStage";

export class ClashStageManager {
  stageContainer: HTMLUListElement;
  stageList: ClashStage[] = [];

  constructor(stageContainer: HTMLUListElement){
    this.stageContainer = stageContainer;

    const firstStage = new ClashStage()
    this.stageList.push(firstStage)

    this.renderUI()
  }

  renderUI() {
    this.stageList.forEach((stage) => {
      this.stageContainer.appendChild(stage.stageElement)
    })
  }

  addStage() {}

  removeStage() {}

  exportXML() {}
}


