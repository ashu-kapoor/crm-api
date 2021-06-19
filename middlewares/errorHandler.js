module.exports = (error, req, res, next) => {
  const errors = [];

  if (error && error.apiErrorCode) {
    errors.push({
      code: error.apiErrorCode,
      message: errorMessages[error.apiErrorCode].message,
      details: error.apiData
        ? errorMessages[error.apiErrorCode].details + " " + error.apiData
        : errorMessages[error.apiErrorCode].details,
    });
    res
      .status(errorMessages[error.apiErrorCode].status)
      .json({ results: { errors } });
  } else {
    errors.push({
      code: 1000,
      message: errorMessages[1000].message,
      details: errorMessages[1000].details,
    });
    res.status(errorMessages[1000].status).json({ results: { errors } });
  }
};

const errorMessages = {
  1000: {
    message: "Internal Server Error",
    details: "Unexpected error",
    status: 500,
  },
  1600: {
    message: "Mandatory parameters missing",
    details: "Invalid param value passed for parameter",
    status: 400,
  },
  7000: {
    message: "Not found",
    details: "Record for given id not found",
    status: 400,
  },
};
