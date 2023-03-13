export interface CustomError extends Error {
  isOperational?: boolean;
  statusCode: number;
  status?: string;
  path?: string;
  value?: number;
}
