export type ServerFieldErrors = {
  [key: string]: string;
};

export class ServerValidationError extends Error {
  errors: ServerFieldErrors;

  constructor(errors: ServerFieldErrors, message = "Validation error") {
    super(message);
    this.errors = errors;
  }
}
