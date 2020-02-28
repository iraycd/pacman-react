import { MAZE_WIDTH_IN_TILES, MAZE_HEIGHT_IN_TILES } from './MazeData';
import { assert } from '../util/assert';

export type TileCoordinate = number;
export type ScreenCoordinate = number;

export interface TileCoordinates {
  x: TileCoordinate;
  y: TileCoordinate;
}

export interface ScreenCoordinates {
  x: ScreenCoordinate;
  y: ScreenCoordinate;
}

export const SPRITE_TILE_SIZE = 8;
export const SCREEN_TILE_SIZE = 20;
export const SCALE_FACTOR = SCREEN_TILE_SIZE / SPRITE_TILE_SIZE;

export const MAZE_WIDTH_IN_SCREEN_COORDINATES =
  MAZE_WIDTH_IN_TILES * SCREEN_TILE_SIZE;
export const MAZE_HEIGHT_IN_SCREEN_COORDINATES =
  MAZE_HEIGHT_IN_TILES * SCREEN_TILE_SIZE;

export const isTxValid = (tx: TileCoordinate) =>
  tx >= 0 && tx < MAZE_WIDTH_IN_TILES;
export const isTyValid = (ty: TileCoordinate) =>
  ty >= 0 && ty < MAZE_HEIGHT_IN_TILES;
export const isValidTileCoordinates = (tile: TileCoordinates) =>
  isTxValid(tile.x) && isTyValid(tile.y);

export const assertValidTx = (tx: TileCoordinate) => {
  assert(isTxValid(tx), `Invalid t.x ${tx} ${MAZE_WIDTH_IN_TILES}`);
};

export const assertValidTy = (ty: TileCoordinate) => {
  assert(isTyValid(ty), `Invalid t.y ${ty} ${MAZE_HEIGHT_IN_TILES}`);
};

export const assertValidTileCoordinates = (tile: TileCoordinates) => {
  assertValidTx(tile.x);
  assertValidTy(tile.y);
};

export const screenFromTileCoordinate = (
  tileCoordinate: TileCoordinate
): ScreenCoordinate => (tileCoordinate + 0.5) * SCREEN_TILE_SIZE;

export const tileFromScreenCoordinate = (
  screenCoordinate: ScreenCoordinate
): TileCoordinate => Math.floor(screenCoordinate / SCREEN_TILE_SIZE);

export const screenFromTile = (tile: TileCoordinates): ScreenCoordinates => ({
  x: screenFromTileCoordinate(tile.x),
  y: screenFromTileCoordinate(tile.y),
});

export const tileFromScreen = (screen: ScreenCoordinates): TileCoordinates => ({
  x: tileFromScreenCoordinate(screen.x),
  y: tileFromScreenCoordinate(screen.y),
});

export const getTileVector = (
  from: TileCoordinates,
  to: TileCoordinates
): TileCoordinates => ({
  x: to.x - from.x,
  y: to.y - from.y,
});

export const rotateTileVectorBy180Degress = (
  vector: TileCoordinates
): TileCoordinates => ({
  x: -vector.x,
  y: -vector.y,
});

export const moveTileByVector = (
  tile: TileCoordinates,
  vector: TileCoordinates
): TileCoordinates => ({
  x: tile.x + vector.x,
  y: tile.y + vector.y,
});

export const multiplyVector = (
  factor: number,
  vector: TileCoordinates
): TileCoordinates => ({
  x: factor * vector.x,
  y: factor * vector.y,
});
