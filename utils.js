export const getTrianglesFromSizes = ({ width, height, length }) => ({
  vertices: [
    [-1 * width, -1 * height, length],
    [width, -1 * height, length],
    [-1 * width, height, length],
    [width, height, length],
    [-1 * width, -1 * height, -1 * length],
    [width, -1 * height, -1 * length],
    [-1 * width, height, -1 * length],
    [width, height, -1 * length],
  ],
  faces: [
    [0, 3, 2],
    [0, 1, 3],
    [1, 7, 3],
    [1, 5, 7],
    [5, 6, 7],
    [5, 4, 6],
    [4, 2, 6],
    [4, 0, 2],
    [2, 7, 6],
    [2, 3, 7],
    [4, 1, 0],
    [4, 5, 1],
  ],
});

export const noop = () => {};
