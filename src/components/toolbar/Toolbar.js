import ExcelComponent from '../../core/ExcelComponent';

export default class Toolbar extends ExcelComponent {
	static className = 'excel__toolbar';

	constructor($root, options) {
		super($root, {
			name: 'Toolbar',
			...options
		});
	}

	toHTML() {
		return `
			<div class="excel__toolbar-button">
				<i class="material-icons">format_bold</i>
			</div>
			<div class="excel__toolbar-button">
				<i class="material-icons">format_italic</i>
			</div>
			<div class="excel__toolbar-button">
				<i class="material-icons">format_underline</i>
			</div>
			<div class="excel__toolbar-button">
				<i class="material-icons">format_align_left</i>
			</div>
			<div class="excel__toolbar-button">
				<i class="material-icons">format_align_center</i>
			</div>
			<div class="excel__toolbar-button">
				<i class="material-icons">format_align_right</i>
			</div>
		`;
	}
}
