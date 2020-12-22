export const getTrianglesFromSizes = ({ width, height, length }) => {
  var t = `{"vertices":["-${width}, -${height}, ${length}","${width}, -${height}, ${length}","-${width}, ${height}, ${length}","${width}, ${height}, ${length}","-${width}, -${height}, -${length}","${width}, -${height}, -${length}","-${width}, ${height}, -${length}","${width}, ${height}, -${length}"],"faces": ["0, 3, 2","0, 1, 3","1, 7, 3","1, 5, 7","5, 6, 7","5, 4, 6","4, 2, 6","4, 0, 2","2, 7, 6","2, 3, 7","4, 1, 0","4, 5, 1"]}`;

  return t;
};
