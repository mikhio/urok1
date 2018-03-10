/* global PointJS */
/* eslint-disable prefer-destructuring */
/* eslint-disable guard-for-in */

const pjs = new PointJS(1000, 700, { backgroundColor: '#999999' });
const point = pjs.vector.point;
const game = pjs.game;
const key = pjs.keyControl;
let b = '';

key.initKeyControl();

const rect = game.newRectObject({
  x: 420,
  y: 120,
  w: 100,
  h: 100,
  fillColor: 'green',
});

const rect1 = game.newRectObject({
  x: 120,
  y: 30,
  w: 1,
  h: 540,
  fillColor: 'yellow',
});
const rect2 = game.newRectObject({
  x: 120,
  y: 30,
  w: 850,
  h: 1,
  fillColor: 'yellow',
});
const rect3 = game.newRectObject({
  x: 120,
  y: 360,
  w: 880,
  h: 1,
  fillColor: 'yellow',
});
const rect4 = game.newRectObject({
  x: 700,
  y: 30,
  w: 1,
  h: 540,
  fillColor: 'yellow',
});

const rects = [rect1, rect2, rect3, rect4];
game.newLoop('myGame', () => {
  let dx = 0;
  let dy = 0;
  const speed = 10;

  function h(key1, x, y) {
    if (key.isDown(key1)) {
      dx = x;
      dy = y;
      b = `key pressed: ${key1}`;
    }
  }

  h('D', speed, 0);
  h('A', -speed, 0);
  h('S', 0, speed);
  h('W', 0, -speed);
  h('RIGHT', speed, 0);
  h('LEFT', -speed, 0);
  h('DOWN', 0, speed);
  h('UP', 0, -speed);

  if (key.isDown('R')) rect.turn(1);

  rects.forEach((r) => {
    // left
    if (r.isStaticIntersect(rect.getStaticBoxA(-speed, 0, speed)) && dx === -speed) {
      dx = (r.x + r.w) - rect.x;
    }

    // right
    if (r.isStaticIntersect(rect.getStaticBoxD(0, 0, speed)) && dx === speed) {
      dx = r.x - rect.w - rect.x;
    }

    // up
    if (r.isStaticIntersect(rect.getStaticBoxW(0, -speed, 0, speed)) && dy === -speed) {
      dy = (r.y + r.h) - rect.y;
    }

    // down
    if (r.isStaticIntersect(rect.getStaticBoxS(0, 0, 0, speed)) && dy === speed) {
      dy = r.y - rect.h - rect.y;
    }

    r.draw();
  });

  rect.move(point(dx, dy));
  rect.draw();

  pjs.brush.drawText({
    text: key.getCountKeysDown() > 0 ? b : b = '',
    x: 20,
    y: 20,
    color: 'black',
    size: 30,
  });
});

game.setLoop('myGame');
game.start();
