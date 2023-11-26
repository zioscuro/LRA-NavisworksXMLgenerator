import { ClashStageManager } from './ClashStageManager';

type IClashTestOptions = {
  type: 'hard' | 'duplicate';
  tollerance: number;
  autointesect: boolean;
} | null;

export class ClashStage {
  stageElement: HTMLElement;
  stageManager: ClashStageManager;
  options: IClashTestOptions = null;

  constructor(manager: ClashStageManager) {
    this.stageManager = manager;
    this.stageElement = document.createElement('li');
    this.stageElement.innerHTML = this.renderUI();
    this.setupListeners();
  }

  addStage() {
    this.stageManager.addStage();
  }

  removeStage() {
    this.stageManager.removeStage(this);
  }

  setupListeners() {
    const addBtn = this.stageElement.querySelector('.add-stage-btn');
    const removeBtn = this.stageElement.querySelector('.remove-stage-btn');
    const optionsBtn = this.stageElement.querySelector('.options-stage-btn');
    const optionsModal = this.stageElement.querySelector('.stage-modal');

    if (
      addBtn instanceof HTMLButtonElement &&
      removeBtn instanceof HTMLButtonElement &&
      optionsBtn instanceof HTMLButtonElement &&
      optionsModal instanceof HTMLDialogElement
    ) {
      addBtn.addEventListener('click', this.addStage.bind(this));
      removeBtn.addEventListener('click', this.removeStage.bind(this));
      optionsBtn.addEventListener('click', () => {
        optionsModal.showModal();
      });
    }
  }

  setStageOptions() {}

  renderUI() {
    return `
    <li class="clash-stage">
      <div class="clash-stage-header">
        <h3>Stage</h3>
        <button class="remove-stage-btn">-</button>
        <button class="add-stage-btn">+</button>
      </div>
      <div>
        <button class="options-stage-btn">options</button>
      </div>
      <dialog class="stage-modal">
        <form>
        <h4>stage options</h4>
        <section>
          <label>Clash Type:</label>
          <label>duplicate
            <input type="radio" name="type" value="duplicate">
          </label>
          <label>intersections
            <input type="radio" name="type" value="hard">
          </label>
        </section>
        <section>
          <label>Tollerance</label>
          <input type="number" name="tollerance" value="0.1640419948">
        </section>
        <section>
          <label>autointersect
            <input type="checkbox" name="autointesect">
          </label>
        </section>
        <hr>
        <input type="submit" value="update">
      </form>
      </dialog>
    </li>    
    `;
  }
}
