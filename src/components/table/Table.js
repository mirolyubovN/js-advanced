import ExcelComponent from '../../core/ExcelComponent';
import {
	shouldResize,
	isCell,
	matrix,
	newSelector
} from './table.functions';
import resizeHandler from './table.resize';
import createTable from './table.template';
import TableSelection from './TableSelection';
import $ from '../../core/Dom';

export default class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options
		});
	}

	toHTML() {
		return createTable();
	}

	selectCell($cell) {
		this.selection.select($cell);
		this.$emit('table:select', $cell);
	}

	init() {
		super.init();
		this.selection = new TableSelection();

		const $cell = this.$root.find('[data-id="0:0"]');

		this.selectCell($cell);

		this.$on('formula:input', text => {
			this.selection.current.text(text);
		});

		this.$on('formula:enter', () => {
			this.selection.current.focus();
		});
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			resizeHandler(this.$root, event);
		} else if (isCell(event)) {
			const $target = $(event.target);

			if (event.shiftKey) {
				const $selectedCells = matrix($target, this.selection.current)
					.map(id => this.$root.find(`[data-id="${id}"]`));

				this.selection.selectGroup($selectedCells);
			} else {
				this.selection.select($target);
			}
		}
	}

	onKeydown(event) {
		const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
		const {key, shiftKey} = event;

		if (keys.includes(key) && !shiftKey) {
			event.preventDefault();

			const id = this.selection.current.id(true);
			const $newSelection = this.$root.find(newSelector(key, id));

			this.selectCell($newSelection);
		}
	}

	onInput(event) {
		this.$emit('table:input', $(event.target));
	}
}

