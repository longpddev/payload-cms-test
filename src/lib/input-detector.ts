export enum InputType {
  TOUCH = 'touch',
  MOUSE = 'mouse',
}

class InputDetector {
  private inputType: InputType
  constructor() {
    this.inputType = this.detectInitialInput()
    this.setupListeners()
  }

  detectInitialInput() {
    if ('ontouchstart' in window) {
      return InputType.TOUCH
    }
    return InputType.MOUSE
  }

  setupListeners() {
    // Touch started - definitely touch
    document.addEventListener('touchstart', () => {
      this.inputType = InputType.TOUCH
    })

    // Mouse move without touch - likely mouse
    document.addEventListener('mousemove', () => {
      // Only set to mouse if we haven't detected touch recently
      this.inputType = InputType.MOUSE
    })
  }

  getCurrentInput() {
    return this.inputType
  }

  isTouch() {
    return this.inputType === InputType.TOUCH
  }

  isMouse() {
    return this.inputType === InputType.MOUSE
  }
}

const detector = new InputDetector()

export default detector
