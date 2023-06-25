type THttpStatus = {
  CODE: number;
  MESSAGE: string;
};

type THttpStatuses = {
  OK: THttpStatus;
  CREATED: THttpStatus;
  NO_CONTENT: THttpStatus;
  PARTIAL_CONTENT: THttpStatus;
  BAD_REQUEST: THttpStatus;
  UNAUTHORIZED: THttpStatus;
  FORBIDDEN: THttpStatus;
  NOT_FOUND: THttpStatus;
  METHOD_NOT_ALLOWED: THttpStatus;
  CONFLICT: THttpStatus;
  VALIDATION_ERROR: THttpStatus;
  FAILED_DEPENDENCY: THttpStatus;
  INTERNAL_SERVER_ERROR: THttpStatus;
  SERVICE_UNAVAILABLE: THttpStatus;
  GATEWAY_TIMEOUT: THttpStatus;
  NOT_MODIFIED: THttpStatus;
};

export const HTTP_STATUS: THttpStatuses = {
  OK: {
    CODE: 200,
    MESSAGE: "success",
  },
  CREATED: {
    CODE: 201,
    MESSAGE: "success",
  },
  NO_CONTENT: {
    CODE: 204,
    MESSAGE: "No content",
  },
  PARTIAL_CONTENT: {
    CODE: 206,
    MESSAGE: "Partial content",
  },
  BAD_REQUEST: {
    CODE: 400,
    MESSAGE: "Bad request",
  },
  UNAUTHORIZED: {
    CODE: 401,
    MESSAGE: "Unauthorized",
  },
  FORBIDDEN: {
    CODE: 403,
    MESSAGE: "Forbidden",
  },
  NOT_FOUND: {
    CODE: 404,
    MESSAGE: "Not found",
  },
  METHOD_NOT_ALLOWED: {
    CODE: 405,
    MESSAGE: "Method Not Allowed",
  },
  CONFLICT: {
    CODE: 409,
    MESSAGE: "Conflict",
  },
  VALIDATION_ERROR: {
    CODE: 422,
    MESSAGE: "Validation error",
  },
  FAILED_DEPENDENCY: {
    CODE: 424,
    MESSAGE: "Failed Dependency",
  },
  INTERNAL_SERVER_ERROR: {
    CODE: 500,
    MESSAGE: "Internal server error",
  },
  SERVICE_UNAVAILABLE: {
    CODE: 503,
    MESSAGE: "Service Unavailable",
  },
  GATEWAY_TIMEOUT: {
    CODE: 504,
    MESSAGE: "Gateway Timeout",
  },
  NOT_MODIFIED: {
    CODE: 304,
    MESSAGE: "Not modified",
  },
};
