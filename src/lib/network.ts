import * as PIXI from 'pixi.js';

const width = window.innerWidth;
const height = document.getElementById('top').clientHeight;
const app = new PIXI.Application({
	width,
	height,
	backgroundAlpha: 0,
	antialias: true
});
const graphics = new PIXI.Graphics();

// lerp function with 5 arguments

const points: { x: number; y: number }[] = [];
const numX = 10,
	numY = 5;
for (let x = 0; x < numX; x++) {
	for (let y = 0; y < numY; y++) {
		const xBase = ((x + (y % 2) / 2) * width) / (numX - 1);
		const yBase = (y * height) / (numY - 1);

		const diff = 20;
		points.push({ x: xBase, y: yBase });
		// points.push({ x: xBase + Math.random() * diff, y: yBase + Math.random() * diff });
	}
}
console.log(points.length);

app.stage.addChild(graphics);
let count = 0;
app.ticker.add(() => {
	graphics.clear();
	count += 0.01;
	graphics.moveTo(points[0].x, points[0].y);
	points.forEach((p, i) => {
		const toIndex = (row: number, col: number) => {
			return col * numY + row;
		};

		const toGrid = (i: number) => {
			return [i % numY, Math.round((i / numY) % numX)];
		};

		const [row, col] = toGrid(i);

		const bottomIndex = toIndex(row + 1, col);
		const rightIndex = toIndex(row, col + 1);
		const bottomRightIndex = toIndex(row + 1, col + 1);

		const bottomRight = points[bottomRightIndex];
		graphics.lineStyle(1, 0x263b71, 1);
		if (bottomRight) {
			graphics.beginFill();
			graphics.moveTo(p.x, p.y);
			graphics.lineTo(bottomRight.x, bottomRight.y);
			graphics.endFill();
		}

		const bottom = points[bottomIndex];
		if (bottom && row !== numY - 1) {
			graphics.beginFill();
			graphics.moveTo(p.x, p.y);
			graphics.lineTo(bottom.x, bottom.y);
			graphics.endFill();
		}

		const right = points[rightIndex];
		if (right && col !== numX - 1) {
			graphics.beginFill();
			graphics.moveTo(p.x, p.y);
			graphics.lineTo(right.x, right.y);
			graphics.endFill();
		}

		// const text = new PIXI.Text(`${i}: ${row}, ${col}`, {
		// 	fontSize: 10
		// });
		// text.x = p.x;
		// text.y = p.y;

		// graphics.addChild(text);

		points[i] = {
			// x: p.x + Math.sin(count + i) * 0.3,
			// y: p.y + Math.cos(count + i) * 0.3
			x: p.x,
			y: p.y
		};
		graphics.beginFill(0x263b71);
		graphics.drawCircle(p.x, p.y, 2);
		graphics.endFill();
	});
});
document.getElementById('top').appendChild(app.view);
