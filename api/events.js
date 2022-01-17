/**
 * A Simple function to insert socket class and reflect the broadcast data
 * @param  {function} socket_io
 * @param  {obj} data will reflect
 */
module.exports.search_results = function (socket_io, data) {
  socket_io.broadcast.emit("pass-results", data);
};
