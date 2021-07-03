import $ from '../../core/Dom';

export default function resizeHandler($root, event) {
	const $resizer = $(event.target);
	const $parent = $resizer.closest('[data-type="resizable"]');
	const index = $parent.data.col;
	const coords = $parent.getCoords();
	const type = $resizer.data.resize;

	let value;

	document.onmousemove = e => {
		if (type === 'col') {
			const delta = e.pageX - coords.right;

			value = coords.width + delta;

			$resizer.css({
				opacity: 1,
				bottom: '-5000px',
				right: -delta - ($resizer.getCoords().width / 2) + 'px'
			});
		} else {
			const delta = e.pageY - coords.bottom;

			value = coords.height + delta;

			$resizer.css({
				opacity: 1,
				right: '-5000px',
				bottom: -delta - ($resizer.getCoords().height / 2) + 'px'
			});
		}
	};

	document.onmouseup = () => {
		document.onmousemove = null;
		document.onmouseup = null;

		if (type === 'col') {
			const cells = $root.findAll(`[data-col="${index}"]`);

			cells.forEach(el => {
				el.style.width = value + 'px';
			});

			$resizer.css({
				opacity: 0,
				bottom: 0,
				right: -($resizer.getCoords().width / 2) + 'px'
			});
		} else {
			$parent.css({
				height: value + 'px'
			});

			$resizer.css({
				opacity: 0,
				bottom: -($resizer.getCoords().height / 2) + 'px',
				right: 0
			});
		}
	};
}
