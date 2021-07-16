const CODES = {
	A: 65,
	Z: 90
};

// function createCell(row, col) {
// 	return `
// 		<div class="excel__table-cell" data-row='${row}' data-col='${col}'></div>
// 	`;
// }

function createCell(row) {
	return function (_, col) {
		return `
			<div contenteditable class="excel__table-cell" data-id='${row}:${col}' data-type='cell' data-col='${col}'></div>
		`;
	};
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

	for (let row = 0; row < rowsCount; row++) {
		const cells = new Array(colsCount)
			.fill('')
			// .map((_, col) => createCell(row, col))
			.map(createCell(row))
			.join('');

		rows.push(createRow(row + 1, cells));
	}

	return rows.join('');
}
