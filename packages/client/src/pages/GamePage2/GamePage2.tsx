import { useEffect, useRef } from 'react';
import classes from './GamePage2.module.css';
import sprite from '../../assets/sprite.png';
import { Player } from '../../features/GameEngine2/Player';
import { Enemy } from '../../features/GameEngine2/Enemy';
import { Bomb } from '../../features/GameEngine2/Bomb';
import { Explosion, Direction } from '../../features/GameEngine2/Explosion';

interface Door {
  x: number;
  y: number;
}

export enum MapElement {
  wall = '▉',
  softWall = 1,
  bomb = 2,
  enemy = 3,
  explosion = 4,
  empty = ' ',
}

export default function GamePage2() {
  let gameState = 'active';
  let door: Door | null = null;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cell = 32;
  const columns = 31;
  const rows = 13;
  const screenWidth = cell * columns;
  const screenHeight = cell * rows;
  const img = new Image();
  img.src = sprite;

  const initialMap = [
    [
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
    ],
    [
      '▉',
      'x',
      'x',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      'x',
      'x',
      '▉',
    ],
    [
      '▉',
      'x',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      'x',
      '▉',
    ],
    [
      '▉',
      'x',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      'x',
      '▉',
    ],
    [
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
    ],
    [
      '▉',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      '▉',
    ],
    [
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
    ],
    [
      '▉',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      '▉',
    ],
    [
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
    ],
    [
      '▉',
      'x',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      'x',
      '▉',
    ],
    [
      '▉',
      'x',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      ' ',
      '▉',
      'x',
      '▉',
    ],
    [
      '▉',
      'x',
      'x',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      'x',
      'x',
      '▉',
    ],
    [
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
      '▉',
    ],
  ];

  let cells: (MapElement | null)[][] = [];
  let entities: (Enemy | Bomb | Explosion)[] = [];

  const generateMap = () => {
    cells = [];
    door = null;

    for (let row = 0; row < rows; row++) {
      cells[row] = [];
      for (let column = 0; column < columns; column++) {
        if (
          initialMap[row][column] === MapElement.empty &&
          Math.random() < 0.5
        ) {
          cells[row][column] = MapElement.softWall;
        } else if (initialMap[row][column] === MapElement.wall) {
          cells[row][column] = MapElement.wall;
        } else if (
          initialMap[row][column] === MapElement.empty &&
          Math.random() > 0.95
        ) {
          cells[row][column] = MapElement.enemy;
        }
      }
    }

    while (!door) {
      const row = Math.floor(Math.random() * rows);
      const column = Math.floor(Math.random() * columns);

      if (!cells[row][column]) {
        cells[row][column] = MapElement.softWall;
        door = { x: column * cell, y: row * cell };
      }
    }
  };

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')!;

    const generateEnemies = () => {
      entities = [];
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          if (cells[row][column] === MapElement.enemy) {
            entities.push(new Enemy(row, column, context));
            cells[row][column] = null;
          }
        }
      }
    };

    const player = new Player(1, 1, context);

    function blowUpBomb(bomb: Bomb) {
      if (!bomb.alive) return;
      bomb.alive = false;
      cells[bomb.row][bomb.column] = null;

      const dirs: Direction[] = [
        {
          row: -1,
          col: 0,
        },
        {
          row: 1,
          col: 0,
        },
        {
          row: 0,
          col: -1,
        },
        {
          row: 0,
          col: 1,
        },
      ];

      dirs.forEach(dir => {
        for (let i = 0; i < bomb.size; i++) {
          const row = bomb.row + dir.row * i;
          const col = bomb.column + dir.col * i;
          const mapCell = cells[row][col];

          if (mapCell === MapElement.wall) {
            return;
          }

          entities.push(new Explosion(row, col, dir, i, context));

          if (mapCell === MapElement.softWall) {
            cells[row][col] = null;
            return;
          }

          if (player.x === col * cell && player.y === row * cell) {
            setTimeout(() => alert('Game over. Your score: 100500'));
            gameState = 'game over';
          } else if (
            player.x === col * cell &&
            player.y > row * cell &&
            player.y < (row + 1) * cell
          ) {
            setTimeout(() => alert('Game over. Your score: 100500'));
            gameState = 'game over';
          } else if (
            player.x === col * cell &&
            player.y + cell > row * cell &&
            player.y + cell < (row + 1) * cell
          ) {
            setTimeout(() => alert('Game over. Your score: 100500'));
            gameState = 'game over';
          } else if (
            player.y === row * cell &&
            player.x > col * cell &&
            player.x < (col + 1) * cell
          ) {
            setTimeout(() => alert('Game over. Your score: 100500'));
            gameState = 'game over';
          } else if (
            player.y === row * cell &&
            player.x + cell > col * cell &&
            player.x + cell < (col + 1) * cell
          ) {
            setTimeout(() => alert('Game over. Your score: 100500'));
            gameState = 'game over';
          }

          entities
            .filter(entity => entity.type === MapElement.enemy)
            .forEach(enemy => {
              if (enemy.x === col * cell && enemy.y === row * cell) {
                enemy.alive = false;
              } else if (
                enemy.x === col * cell &&
                enemy.y > row * cell &&
                enemy.y < (row + 1) * cell
              ) {
                enemy.alive = false;
              } else if (
                enemy.x === col * cell &&
                enemy.y + cell > row * cell &&
                enemy.y + cell < (row + 1) * cell
              ) {
                enemy.alive = false;
              } else if (
                enemy.y === row * cell &&
                enemy.x > col * cell &&
                enemy.x < (col + 1) * cell
              ) {
                enemy.alive = false;
              } else if (
                enemy.y === row * cell &&
                enemy.x + cell > col * cell &&
                enemy.x + cell < (col + 1) * cell
              ) {
                enemy.alive = false;
              }
            });

          if (mapCell === MapElement.bomb) {
            const nextBomb = entities.find(entity => {
              return (
                entity.type === MapElement.bomb &&
                entity.row === row &&
                entity.column === col
              );
            });
            blowUpBomb(nextBomb as Bomb);
          }
        }
      });
    }

    const update = (step: number) => {
      const enemies = entities.filter(
        entity => entity.type === MapElement.enemy
      ) as Enemy[];

      enemies.forEach(enemy => {
        if (enemy.checkPlayerTouch(player)) {
          alert('Game over. Your score: 100500');
          gameState = 'game over';
        }
      });

      entities.forEach(entity => {
        entity.update(step);
      });

      player.update(step);

      entities = entities.filter(entity => entity.alive);

      if (
        door &&
        enemies.length === 0 &&
        player.x === door.x &&
        player.y === door.y
      ) {
        gameState = 'you win';
        alert('You win!. Your score: 100500');
      }

      player.move(cells);
      enemies.forEach(enemy => {
        enemy.move(cells);
      });
    };

    const render = (dt: number) => {
      if (door) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 176, 48, 16, 16, door.x, door.y, cell, cell);
      }

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          switch (cells[row][column]) {
            case MapElement.wall:
              context.drawImage(
                img,
                48,
                48,
                16,
                16,
                column * cell,
                row * cell,
                cell,
                cell
              );
              break;
            case MapElement.softWall:
              context.drawImage(
                img,
                64,
                48,
                16,
                16,
                column * cell,
                row * cell,
                cell,
                cell
              );
              break;
          }
        }
      }

      entities.forEach(entity => {
        entity.render();
      });

      player.render();
    };

    let last = performance.now();
    const step = 1 / 60;
    let dt = 0;
    let now: number;

    let req: number;

    const frame = () => {
      if (gameState === 'game over' || gameState === 'you win') {
        cancelAnimationFrame(req);
        return;
      }
      now = performance.now();
      dt = dt + Math.min(1, (now - last) / 1000);
      while (dt > step) {
        dt = dt - step;
        update(step);
      }
      last = now;

      render(dt);
      req = requestAnimationFrame(frame);
    };

    generateMap();
    generateEnemies();
    requestAnimationFrame(frame);

    document.addEventListener('keydown', function (e) {
      const row = Math.round(player.y / cell);
      const col = Math.round(player.x / cell);

      // влево
      if (e.which === 37) {
        player.direction.LEFT = true;
      }
      // вверх
      else if (e.which === 38) {
        player.direction.UP = true;
      }
      // вправо
      else if (e.which === 39) {
        player.direction.RIGHT = true;
      }
      // вниз
      else if (e.which === 40) {
        player.direction.DOWN = true;
      } else if (
        e.which === 32 &&
        !cells[row][col] &&
        entities.filter(entity => entity.type === MapElement.bomb).length <
          player.bombsCount
      ) {
        const bomb = new Bomb(row, col, player.bombSize, blowUpBomb, context);
        entities.push(bomb);
        cells[row][col] = MapElement.bomb;
      }
    });

    document.addEventListener('keyup', function (e) {
      // влево
      if (e.which === 37) {
        player.direction.LEFT = false;
      }
      // вверх
      else if (e.which === 38) {
        player.direction.UP = false;
      }
      // вправо
      else if (e.which === 39) {
        player.direction.RIGHT = false;
      }
      // вниз
      else if (e.which === 40) {
        player.direction.DOWN = false;
      }
    });
  }, []);

  return (
    <canvas
      className={classes.canvas}
      ref={canvasRef}
      width={screenWidth}
      height={screenHeight}
    />
  );
}
