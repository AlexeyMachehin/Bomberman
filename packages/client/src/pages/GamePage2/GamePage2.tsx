import { useEffect, useRef } from 'react';
import classes from './GamePage2.module.css';
import sprite from '../../assets/sprite.png';

export default function GamePage2() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cell = 32;
  const columns = 31;
  const rows = 13;
  const screenWidth = cell * columns;
  const screenHeight = cell * rows;
  const playerSpeed = 2;
  const img = new Image();
  img.src = sprite;

  let x = 32;
  let y = 32;

  const inputState = {
    UP: false,
    DOWN: false,
    LEFT: false,
    RIGHT: false,
  };

  enum MapElement {
    wall = '▉',
    softWall = 1,
    bomb = 2,
    enemy = 3,
    empty = ' ',
  }

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

  let cells = [];
  let entities = [];

  const generateMap = () => {
    cells = [];

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
            entities.push(new Enemy(row, column));
          }
        }
      }
    };

    const player = {
      row: 1,
      column: 1,
      bombsCount: 1,
      bombSize: 4,
      timer: 0,
      spriteX: 48,

      update(step: number) {
        this.timer += step;
        const interval = Math.ceil(this.timer / 0.25);

        switch (interval % 6) {
          case 0:
          case 5:
            this.spriteX = 48;
            break;
          case 1:
          case 4:
            this.spriteX = 64;
            break;
          case 2:
          case 3:
            this.spriteX = 80;
            break;
        }
      },

      render() {
        context.drawImage(img, this.spriteX, 0, 16, 16, x, y, cell, cell);
      },
    };

    function Enemy(row, col) {
      this.row = row;
      this.col = col;
      this.dir = 1;
      this.speed = 1;
      this.alive = true;
      this.x = col * cell;
      this.y = row * cell;

      this.update = function (dt) {
        // if (this.dir === 1 && this.x + cell + this.speed > canvas.width) {
        //   this.dir = -1;
        //   return;
        // }

        // if (this.dir === -1 && this.x - this.speed < 0) {
        //   this.dir = 1;
        // }
        let count = 0;

        for (let row = 0; row < rows; row++) {
          for (let column = 0; column < columns; column++) {
            switch (cells[row][column]) {
              case MapElement.wall:
              case MapElement.softWall:
              case MapElement.bomb:
                if (
                  
                  this.x - this.speed < (column + 1) * cell &&
                  this.x >= (column + 1) * cell &&
                  ((this.y >= row * cell && this.y < (row + 1) * cell) ||
                    (this.y + cell > row * cell &&
                      this.y + cell <= (row + 1) * cell))
                ) {
                  this.dir = 1;
                  count++;
                } 
                
                if (
                  
                  this.x + cell + this.speed > column * cell &&
                  this.x + cell <= column * cell &&
                  ((this.y >= row * cell && this.y < (row + 1) * cell) ||
                    (this.y + cell > row * cell &&
                      this.y + cell <= (row + 1) * cell))
                ) {
                  this.dir = -1;
                  count++;
                }
            }
          }
        }

        if (count === 2) {
          return;
        }
        this.x += this.speed * this.dir;
      };

      this.render = function () {
        context.drawImage(img, 0, 240, 16, 16, this.x, this.y, cell, cell);
      };
    }

    function Bomb(row, col, size) {
      this.row = row;
      this.col = col;
      this.size = size;
      this.alive = true;
      this.type = MapElement.bomb;
      this.timer = 3;
      this.spriteX = 0;
      this.update = function (dt) {
        this.timer -= dt;

        if (this.timer <= 0) {
          return blowUpBomb(this);
        }

        const interval = Math.ceil(this.timer / 0.5);

        switch (interval % 6) {
          case 0:
          case 5:
            this.spriteX = 0;
            break;
          case 1:
          case 4:
            this.spriteX = 16;
            break;
          case 2:
          case 3:
            this.spriteX = 32;
            break;
        }
      };

      this.render = function () {
        context.drawImage(
          img,
          this.spriteX,
          48,
          16,
          16,
          col * cell,
          row * cell,
          cell,
          cell
        );
      };
    }

    function Explosion(row, col, dir, center) {
      // координаты и направление
      this.row = row;
      this.col = col;
      this.dir = dir;
      this.alive = true;

      // взыв длится 300 миллисекунд
      this.timer = 0.3;

      // обновляем таймер длительности взрыва на каждом шаге анимации
      this.update = function (dt) {
        this.timer -= dt;

        if (this.timer <= 0) {
          this.alive = false;
        }
      };

      // отрисовка взрыва
      this.render = function () {
        const x = this.col * cell;
        const y = this.row * cell;
        const horizontal = this.dir.col;
        const vertical = this.dir.row;

        // создаём эффект огня из красных, оранжевых и жёлтых полос
        // у каждого цвета — свой размер такой полосы

        // красная
        context.fillStyle = '#D72B16';
        context.fillRect(x, y, cell, cell);

        // оранжевая
        context.fillStyle = '#F39642';
        // определяем, как нам рисовать линии — по горизонтали или по вертикали
        // на центре отрисовываем в обоих направлениях
        if (center || horizontal) {
          context.fillRect(x, y + 6, cell, cell - 12);
        }
        if (center || vertical) {
          context.fillRect(x + 6, y, cell - 12, cell);
        }

        // жёлтая
        context.fillStyle = '#FFE5A8';
        // точно так же выбираем направления
        if (center || horizontal) {
          context.fillRect(x, y + 12, cell, cell - 24);
        }
        if (center || vertical) {
          context.fillRect(x + 12, y, cell - 24, cell);
        }
      };
    }

    function blowUpBomb(bomb) {
      if (!bomb.alive) return;
      bomb.alive = false;
      cells[bomb.row][bomb.col] = null;

      const dirs = [
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
          const col = bomb.col + dir.col * i;
          const cell = cells[row][col];

          if (cell === MapElement.wall) {
            return;
          }

          entities.push(new Explosion(row, col, dir, i === 0 ? true : false));
          cells[row][col] = null;

          if (cell === MapElement.bomb) {
            const nextBomb = entities.find(entity => {
              return (
                entity.type === MapElement.bomb &&
                entity.row === row &&
                entity.col === col
              );
            });
            blowUpBomb(nextBomb);
          }

          // if (cell) {
          //   return;
          // }
        }
      });
    }

    const update = (step: number) => {
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          switch (cells[row][column]) {
            case MapElement.wall:
            case MapElement.softWall:
            case MapElement.bomb:
              if (
                (inputState.LEFT &&
                  x - playerSpeed < (column + 1) * cell &&
                  x >= (column + 1) * cell &&
                  ((y >= row * cell && y < (row + 1) * cell) ||
                    (y + cell > row * cell && y + cell <= (row + 1) * cell))) ||
                (inputState.RIGHT &&
                  x + cell + playerSpeed > column * cell &&
                  x + cell <= column * cell &&
                  ((y >= row * cell && y < (row + 1) * cell) ||
                    (y + cell > row * cell && y + cell <= (row + 1) * cell)))
              ) {
                if (y % cell <= 8 && y % cell > 0) {
                  y -= y % cell;
                }

                if (y % cell >= 24) {
                  y += cell - (y % cell);
                }
                return;
              }

              if (
                (inputState.UP &&
                  y - playerSpeed < (row + 1) * cell &&
                  y >= (row + 1) * cell &&
                  ((x >= column * cell && x < (column + 1) * cell) ||
                    (x + cell > column * cell &&
                      x + cell <= (column + 1) * cell))) ||
                (inputState.DOWN &&
                  y + cell + playerSpeed > row * cell &&
                  y + cell <= row * cell &&
                  ((x >= column * cell && x < (column + 1) * cell) ||
                    (x + cell > column * cell &&
                      x + cell <= (column + 1) * cell)))
              ) {
                if (x % cell <= 8 && x % cell > 0) {
                  x -= x % cell;
                }

                if (x % cell >= 24) {
                  x += cell - (x % cell);
                }
                return;
              }
          }
        }
      }

      if (inputState.LEFT) {
        x -= playerSpeed;
      }
      if (inputState.RIGHT) {
        x += playerSpeed;
      }
      if (inputState.UP) {
        y -= playerSpeed;
      }
      if (inputState.DOWN) {
        y += playerSpeed;
      }

      entities.forEach(entity => {
        entity.update(step);
      });

      // удаляем отработанные сущности, например, взорванные бомбы
      entities = entities.filter(entity => entity.alive);

      player.update(step);
    };

    const render = (dt: number) => {
      context.clearRect(0, 0, canvas.width, canvas.height);

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
    let now;

    const frame = () => {
      now = performance.now();
      dt = dt + Math.min(1, (now - last) / 1000);
      while (dt > step) {
        dt = dt - step;
        update(step);
      }
      last = now;

      render(dt);
      requestAnimationFrame(frame);
    };

    generateMap();
    generateEnemies();
    requestAnimationFrame(frame);

    document.addEventListener('keydown', function (e) {
      const row = Math.round(y / cell);
      const col = Math.round(x / cell);

      // влево
      if (e.which === 37) {
        inputState.LEFT = true;
      }
      // вверх
      else if (e.which === 38) {
        inputState.UP = true;
      }
      // вправо
      else if (e.which === 39) {
        inputState.RIGHT = true;
      }
      // вниз
      else if (e.which === 40) {
        inputState.DOWN = true;
      } else if (
        e.which === 32 &&
        !cells[row][col] &&
        // считаем количество бомб, которые ставит игрок. Если бомб хватает — ставим.
        entities.filter(entity => entity.type === MapElement.bomb).length <
          player.bombsCount
      ) {
        const bomb = new Bomb(row, col, player.bombSize);

        // отправляем бомбу в массив, чтобы игра её нарисовала на следующем кадре
        entities.push(bomb);
        cells[row][col] = MapElement.bomb;
      }
    });

    document.addEventListener('keyup', function (e) {
      // влево
      if (e.which === 37) {
        inputState.LEFT = false;
      }
      // вверх
      else if (e.which === 38) {
        inputState.UP = false;
      }
      // вправо
      else if (e.which === 39) {
        inputState.RIGHT = false;
      }
      // вниз
      else if (e.which === 40) {
        inputState.DOWN = false;
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
