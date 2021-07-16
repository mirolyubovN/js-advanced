import ExcelComponent from '../../core/ExcelComponent';
import $ from '../../core/Dom';

export default class Formula extends ExcelComponent {
	static className = 'excel__formula';

	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			...options
		});
	}

	toHTML() {
		return `
			<div class="excel__formula-info">
				fx
			</div>
			<div id="formula" class="excel__formula-input" contenteditable spellcheck="false">
			</div>
		`;
	}

	init() {
		super.init();
		this.$formula = this.$root.find('#formula');
		this.$on('table:select', $cell => {
			this.$formula.text($cell.text());
		});
		this.$on('table:input', $cell => {
			this.$formula.text($cell.text());
		});
	}

	onInput(event) {
		const text = $(event.target).text();

		this.$emit('formula:input', text);
	}

	onKeydown(event) {
		const keys = ['Enter', 'Tab'];
		const {key} = event;

		if (keys.includes(key)) {
			event.preventDefault();
			this.$emit('formula:enter');
		}
	}
}
