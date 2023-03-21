import { useEffect, useRef, useState } from 'react';
import classes from './GamePage2.module.css';
import sprite from '../../assets/sprite.png';
import { Player } from '../../features/GameEngine2/Player';
import { PlayerDeath } from '../../features/GameEngine2/PlayerDeath';
import { Enemy } from '../../features/GameEngine2/Enemy';
import { EnemyDeath } from '../../features/GameEngine2/EnemyDeath';
import { Bomb } from '../../features/GameEngine2/Bomb';
import { Explosion, Direction } from '../../features/GameEngine2/Explosion';
import { SoundPool, Sound } from '@/features/GameEngine2/SoundPool';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { addPlayer } from '@/store/user/thunk';
import { selectorUser } from '@/store/user/selectors';
import {
  selectorIsOnMusic,
  selectorVolumeLevel,
} from '@/store/audioPlayer/selectors';
import CountdownBackdrop from '@/features/countdownBackdrop/CountdownBackdrop';
import EndGameBackdrop from '@/features/endGameBackdrop/EndGameBackdrop';
import FullscreenToggler from '@/features/fullscreenToggler/FullscreenToggler';

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
  enemyDeath = 5,
  playerDeath = 6,
  empty = ' ',
}

enum GameState {
  StartBackdrop,
  Active,
  Over,
  Win,
}

export default function GamePage2() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser)!;
  const isOnPlayer = useAppSelector(selectorIsOnMusic);
  const volumeLevelState = useAppSelector(selectorVolumeLevel);

  let canvasGameState = GameState.StartBackdrop;
  let canvasScore = 0;

  const [gameState, setGameState] = useState<GameState>(canvasGameState);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState<number>(canvasScore);
  const [canvasKey, setCanvasKey] = useState<number>(1);

  let door: Door | null = null;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cell = 32;
  const columns = 31;
  const rows = 13;
  const screenWidth = cell * columns;
  const screenHeight = cell * (rows + 1);
  const img = new Image();
  img.src = sprite;

  const volume = isOnPlayer ? volumeLevelState : 0;
  
  // const volume = 1;
  const stepSound = new SoundPool(12, volume);
	stepSound.init(Sound.step);
  const bombInstalSound = new SoundPool(5, volume);
	bombInstalSound.init(Sound.bombInstall);
	const explosionSound = new SoundPool(5, volume);
	explosionSound.init(Sound.explosion);
  const enemyDeathSound = new SoundPool(5, volume);
	enemyDeathSound.init(Sound.enemyDeath);
  const playerDeathSound = new SoundPool(2, volume);
	playerDeathSound.init(Sound.playerDeath);

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
      'x',
      'x',
      '▉',
    ],
    [
      '▉',
      'x',
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
      'x',
      '▉',
    ],
    [
      '▉',
      'x',
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
      ' ',
      '▉',
    ],
    [
      '▉',
      'x',
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
      'x',
      '▉',
      'x',
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
      'x',
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
      'x',
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
      'x',
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
  let entities: (Enemy | Bomb | Explosion | EnemyDeath | PlayerDeath)[] = [];

  const generateMap = () => {
    cells = [];
    door = null;
    let enemiesCount = 0;

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
          enemiesCount++;
        }
      }
    }

    while (enemiesCount < 8) {
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          if (!cells[row][column] && initialMap[row][column] === MapElement.empty && Math.random() > 0.95) {
            cells[row][column] = MapElement.enemy;
            enemiesCount++;
          }
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
    context.font = "30px Arial";
    context.fillStyle = "#ffffff";

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

    const endGame = () => {
      player.drop();
      setTimeout(() => {
        canvasGameState = GameState.Over;
      }, 1500);
    };

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
          explosionSound.get();

          if (mapCell === MapElement.softWall) {
            cells[row][col] = null;
            return;
          }

          const isPlayerInExplosionExactly =
            player.x === col * cell && player.y === row * cell;
          const isPlayerIntersectExplosionDown =
            player.x === col * cell &&
            player.y + cell > row * cell &&
            player.y + cell < (row + 1) * cell;
          const isPlayerIntersectExplosionRight =
            player.y === row * cell &&
            player.x + cell > col * cell &&
            player.x + cell < (col + 1) * cell;
          const isPlayerIntersectExplosionUp =
            player.x === col * cell &&
            player.y > row * cell &&
            player.y < (row + 1) * cell;
          const isPlayerIntersectExplosionLeft =
            player.y === row * cell &&
            player.x > col * cell &&
            player.x < (col + 1) * cell;

          if (
            isPlayerInExplosionExactly ||
            isPlayerIntersectExplosionDown ||
            isPlayerIntersectExplosionRight ||
            isPlayerIntersectExplosionUp ||
            isPlayerIntersectExplosionLeft
          ) {
            entities.push(new PlayerDeath(player));
            playerDeathSound.get();
            endGame();
          }

          entities
            .filter(entity => entity.type === MapElement.enemy)
            .forEach(enemy => {
              const isEnemyInExplosionExactly =
                enemy.x === col * cell && enemy.y === row * cell;
              const isEnemyIntersectExplosionDown =
                enemy.x === col * cell &&
                enemy.y + cell > row * cell &&
                enemy.y + cell < (row + 1) * cell;
              const isEnemyIntersectExplosionRight =
                enemy.y === row * cell &&
                enemy.x + cell > col * cell &&
                enemy.x + cell < (col + 1) * cell;
              const isEnemyIntersectExplosionUp =
                enemy.x === col * cell &&
                enemy.y > row * cell &&
                enemy.y < (row + 1) * cell;
              const isEnemyIntersectExplosionLeft =
                enemy.y === row * cell &&
                enemy.x > col * cell &&
                enemy.x < (col + 1) * cell;

              if (
                isEnemyInExplosionExactly ||
                isEnemyIntersectExplosionDown ||
                isEnemyIntersectExplosionRight ||
                isEnemyIntersectExplosionUp ||
                isEnemyIntersectExplosionLeft
              ) {
                enemy.alive = false;
                canvasScore += 100;
                entities.push(new EnemyDeath(enemy as Enemy));
                enemyDeathSound.get();
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
          entities.push(new PlayerDeath(player));
          playerDeathSound.get();
          endGame();
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
        canvasGameState = GameState.Win;
      }

      if ((player.direction.UP || player.direction.RIGHT || player.direction.DOWN || player.direction.LEFT) && player.stepNumber % 10 === 0) {
        stepSound.get();
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

      context.fillText(`SCORE: ${score + canvasScore}`, 0, screenHeight - 5);
    };

    let last = performance.now();
    const step = 1 / 60;
    let dt = 0;
    let now: number;

    let req: number;

    const frame = () => {
      if (
        canvasGameState === GameState.Over ||
        canvasGameState === GameState.Win
      ) {
        cancelAnimationFrame(req);
        setGameState(canvasGameState);
        setScore(score + canvasScore);

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

    function onKeyDown(e: KeyboardEvent) {
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
        bombInstalSound.get();
        cells[row][col] = MapElement.bomb;
      }
    }

    function onKeyUp(e: KeyboardEvent) {
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
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return function cleanUp() {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [gameState]);

  const player = {
    displayName: user.display_name,
    score,
    avatarURL: user.avatar,
    id: user.id,
  };

  useEffect(() => {
    if (score === 0) {
      return;
    }

    dispatch(addPlayer(player));
  }, [score]);

  const startLevel = () => {
    setGameState(GameState.Active);
  };

  const restart = () => {
    setScore(0);
    setLevel(1);
    setCanvasKey(canvasKey + 1);
    setGameState(GameState.StartBackdrop);
  };

  const startNextLevel = () => {
    setLevel(level + 1);
    setCanvasKey(canvasKey + 1);
    setGameState(GameState.StartBackdrop);
  };

  return (
    <>
      {gameState === GameState.StartBackdrop ? (
        <CountdownBackdrop level={level} closeCb={startLevel} />
      ) : null}
      <div className={classes.page}>
        {gameState === GameState.Active ? (
          <>
            <canvas
              id={`game${canvasKey}`}
              className={classes.canvas}
              ref={canvasRef}
              width={screenWidth}
              height={screenHeight}
              key={canvasKey}
            />
            <div className={classes.fullscreenBtn}>
              <FullscreenToggler elementId={`game${canvasKey}`} />
            </div>
          </>
        ) : null}
        {gameState === GameState.Over || gameState === GameState.Win ? (
          <EndGameBackdrop
            user={player}
            level={level}
            isWin={gameState === GameState.Win}
            winCb={startNextLevel}
            loseCb={restart}
          />
        ) : null}
      </div>
    </>
  );
}
