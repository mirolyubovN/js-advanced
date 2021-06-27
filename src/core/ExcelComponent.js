import DOMListener from './DOMListener';

export default class ExcelComponent extends DOMListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
	}

	// return html structure of components
	toHTML() {
		return '';
	}

	init() {
		this.initDOMListeners();
	}

	destroy() {
		this.removeDOMListeners();
	}
}
