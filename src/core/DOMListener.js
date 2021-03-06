import {capitalize} from './utils';

function getMethodName(eventName) {
	return 'on' + capitalize(eventName);
}

export default class DOMListener {
	constructor($root, listeners = []) {
		if (!$root) {
			throw new Error('No $root provided for DOMListenter');
		}
		this.$root = $root;
		this.listeners = listeners;
	}

	initDOMListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener);

			if (!this[method]) {
				throw new Error(`Method ${method} is not implemented in ${this.name} component`);
			}

			this[method] = this[method].bind(this);
			this.$root.on(listener, this[method]);
			console.log(listener);
		});
	}

	removeDOMListeners() {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener);

			if (!this[method]) {
				throw new Error(`Method ${method} is not implemented in ${this.name} component`);
			}

			this.$root.off(listener, this[method]);
		});
	}
}
