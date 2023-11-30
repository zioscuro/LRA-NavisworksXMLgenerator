import { StageManager } from './StageManager';
import { Matrix } from './Matrix';

type ClashTestOptions = {
  clashType: 'hard' | 'duplicate';
  tollerance: number;
  autointesect: boolean;
};

const defaultOptions: ClashTestOptions = {
  clashType: 'duplicate',
  tollerance: 0.1640419948,
  autointesect: true,
};

export class Stage {
  stageElement: HTMLElement;
  stageManager: StageManager;
  stageMatrix: Matrix;
  options: ClashTestOptions = defaultOptions;

  constructor(manager: StageManager) {
    this.stageManager = manager;
    this.stageMatrix = new Matrix(this);
    this.stageElement = document.createElement('li');
    this.stageElement.innerHTML = this.renderUI();
    this.setupListeners();
  }

  renderUI() {
    return `
    <li class="clash-stage">
      <div class="clash-stage-header">
        <h3>Stage</h3>
        <button class="remove-stage-btn">-</button>
        <button class="add-stage-btn">+</button>
      </div>
      <div class="clash-stage-body">
        <h4>Current settings</h4>
        <p>clash type: ${this.options.clashType}</p>
        <p>tollerance: ${this.options.tollerance}</p>
        <p>autointersect: ${this.options.autointesect}</p>
        <button class="options-stage-btn">options</button>
        <button class="gen-matrix-btn">gen matrix</button>
        <button class="refresh-matrix-btn" disabled>refresh matrix</button>
      </div>
      <dialog class="stage-modal">
        <form>
        <h4>stage options</h4>
        <section>
          <label>Clash Type:</label>
          <label>duplicate
            <input type="radio" name="clash-type" value="duplicate">
          </label>
          <label>intersections
            <input type="radio" name="clash-type" value="hard">
          </label>
        </section>
        <section>
          <label>Tollerance</label>
          <input type="text" name="tollerance" value="0.1640419948">
        </section>
        <section>
          <label>autointersect
            <input type="checkbox" name="autointesect">
          </label>
        </section>
        <hr>
        <input type="submit" value="update">
        <button>cancel</button>
      </form>
      </dialog>
    </li>    
    `;
  }

  setupListeners() {
    const addBtn = this.stageElement.querySelector('.add-stage-btn');
    const removeBtn = this.stageElement.querySelector('.remove-stage-btn');
    const optionsBtn = this.stageElement.querySelector('.options-stage-btn');
    const optionsModal = this.stageElement.querySelector('.stage-modal');
    const optionsForm = this.stageElement.querySelector('.stage-modal form');
    const optionsFormCancBtn = this.stageElement.querySelector(
      '.stage-modal form button'
    );
    const genMatrixBtn = this.stageElement.querySelector('.gen-matrix-btn');
    const refreshMatrixBtn = this.stageElement.querySelector(
      '.refresh-matrix-btn'
    );

    if (
      addBtn instanceof HTMLButtonElement &&
      removeBtn instanceof HTMLButtonElement &&
      optionsBtn instanceof HTMLButtonElement &&
      optionsModal instanceof HTMLDialogElement &&
      optionsForm instanceof HTMLFormElement &&
      optionsFormCancBtn instanceof HTMLButtonElement &&
      genMatrixBtn instanceof HTMLButtonElement &&
      refreshMatrixBtn instanceof HTMLButtonElement
    ) {
      addBtn.addEventListener('click', this.addStage.bind(this));
      removeBtn.addEventListener('click', this.removeStage.bind(this));
      optionsBtn.addEventListener('click', this.showOptions.bind(this));
      optionsForm.addEventListener('submit', this.updateOptions.bind(this));
      optionsFormCancBtn.addEventListener('click', this.hideOptions.bind(this));
      genMatrixBtn.addEventListener('click', this.renderStageMatrix.bind(this));
      refreshMatrixBtn.addEventListener(
        'click',
        this.renderStageMatrix.bind(this)
      );
    }
  }

  addStage() {
    this.stageManager.addStage();
  }

  removeStage() {
    this.stageManager.removeStage(this);
  }

  showOptions() {
    const optionsModal = this.stageElement.querySelector('.stage-modal');
    if (optionsModal instanceof HTMLDialogElement) {
      optionsModal.showModal();
    }
  }

  hideOptions(e: Event) {
    e.preventDefault();
    const optionsModal = this.stageElement.querySelector('.stage-modal');
    if (optionsModal instanceof HTMLDialogElement) {
      optionsModal.close();
    }
  }

  updateOptions(e: Event) {
    e.preventDefault();
    const optionsModal = this.stageElement.querySelector('.stage-modal');
    const optionsForm = this.stageElement.querySelector('.stage-modal form');

    if (
      optionsModal instanceof HTMLDialogElement &&
      optionsForm instanceof HTMLFormElement
    ) {
      const data = new FormData(optionsForm);
      const updatedOptions: ClashTestOptions = {
        clashType: data.get('clash-type') as 'hard' | 'duplicate',
        tollerance: parseFloat(data.get('tollerance') as string) as number,
        autointesect: Boolean(data.get('autointesect') as string),
      };
      this.options = updatedOptions;
      this.stageElement.innerHTML = this.renderUI();
      this.setupListeners();

      optionsForm.reset();
      optionsModal.close();
    }
  }

  renderStageMatrix(e: Event) {
    const stageBody = this.stageElement.querySelector('.clash-stage-body');
    const genMatrixBtn = this.stageElement.querySelector('.gen-matrix-btn');
    const refreshMatrixBtn = this.stageElement.querySelector(
      '.refresh-matrix-btn'
    );

    if (
      !(
        stageBody instanceof HTMLDivElement &&
        genMatrixBtn instanceof HTMLButtonElement &&
        refreshMatrixBtn instanceof HTMLButtonElement
      )
    ) {
      return;
    }

    if (this.options.clashType === 'duplicate') {
      this.stageMatrix.renderDuplicateMatrix();
    } else {
      this.stageMatrix.renderIntersectionsMatrix();
    }

    if (e.target instanceof HTMLButtonElement && e.target === genMatrixBtn) {
      genMatrixBtn.disabled = true;
      refreshMatrixBtn.disabled = false;
      console.log('gen matrix');
    } else if (
      e.target instanceof HTMLButtonElement &&
      e.target === refreshMatrixBtn
    ) {
      genMatrixBtn.disabled = false;
      refreshMatrixBtn.disabled = true;
      console.log('refresh matrix');
    }
  }
}
