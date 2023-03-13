const HttpStatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHENTICATED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};
export default HttpStatusCodes;

// 200 - success
// 201 - a new resource has been successfully created
// 204 - empty response (normally for DELETE requests)
// 400 - a bad request from the client
// 401 - unauthorized
// 403 - forbidden
// 404 - not found
// 500 - internal server error
