import ExcelComponent from '../../core/ExcelComponent';

export default class Header extends ExcelComponent {
	static className = 'excel__header';

	constructor($root, options) {
		super($root, {
			name: 'Heder',
			...options
		});
	}

	toHTML() {
		return `
			<input type="input" value="New table" class="excel__header-input"/>
			<div class="excel__header-buttons">
				<div class="excel__header-button">
					<i class="material-icons">delete</i>
				</div>
				<div class="excel__header-button">
					<i class="material-icons">exit_to_app</i>
				</div>
			</div>
		`;
	}
}
