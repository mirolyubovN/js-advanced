const CODES = {
	A: 65,
	Z: 90
};

function createCell(_, index) {
	return `
		<div class="excel__table-cell" data-col='${index}'></div>
	`;
}

function createCol(col, index) {
	return `
		<div class="excel__table-column" data-type="resizable" data-col='${index}'>
			${col}
			<div class="excel__table-column-resize" data-resize="col"></div>
		</div>
	`;
}

function createRow(index, content) {
	const resizer = index
		? '<div class="excel__table-row-resize" data-resize="row"></div>'
		: '';

	return `
		<div class="excel__table-row" data-type="resizable">
			<div class="excel__table-row-info">
				${index || ''}
				${resizer}
			</div>
			<div class="excel__table-row-data">${content}</div>
		</div>
	`;
}

function toChar(_, index) {
	return String.fromCharCode(CODES.A + index);
}

export default function createTable(rowsCount = 40) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];
	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(createCol)
		.join('');

	rows.push(createRow(null, cols));

	for (let i = 0; i < rowsCount; i++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(createCell)
			.join('');

		rows.push(createRow(i + 1, cells));
	}

	return rows.join('');
}
