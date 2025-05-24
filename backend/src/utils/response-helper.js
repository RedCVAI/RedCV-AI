module.exports = {
  successResponse: (h, data, message = "Success", statusCode = 200) => {
    return h
      .response({
        status: "success",
        message,
        data,
      })
      .code(statusCode);
  },
  errorResponse: (h, message = "Error", statusCode = 400) => {
    return h
      .response({
        status: "fail",
        message,
      })
      .code(statusCode);
  },
};
