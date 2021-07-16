import DOMListener from './DOMListener';

export default class ExcelComponent extends DOMListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
		this.emitter = options.emitter;
		this.unsubs = [];
		this.prepare();
	}

	// setting up component before init
	prepare() {

	}

	// return html structure of components
	toHTML() {
		return '';
	}

	// notify listeners about an event
	$emit(event, ...args) {
		this.emitter.emit(event, ...args);
	}

	// subscribe for an event (with a callback)
	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn);

		this.unsubs.push(unsub);
	}

	// init component
	// add DOM listeners
	init() {
		this.initDOMListeners();
	}

	// destroy components
	// remove DOM listeners
	destroy() {
		this.removeDOMListeners();
		this.unsubs.forEach(unsub => unsub());
	}
}
