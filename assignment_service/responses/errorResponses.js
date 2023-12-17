const badRequest = (res, data) => {
  return res.status(400).json({
    status: 400,
    data,
    message: data[0].msg,
  });
};
/**
 *
 * @param {*} res
 * @param {*} data
 * @returns
 */
const unauthorized = (res, data) => {
  return res.status(403).json({
    status: 403,
    data,
    message: data,
  });
};
export { unauthorized, badRequest };
