import { MissingParamError, InvalidParamError } from '../errors'
import { BAD_REQUEST, OK, SERVER_ERROR } from '../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return BAD_REQUEST(new MissingParamError(field))
        }
      }

      const { email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return BAD_REQUEST(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email as string)
      if (!isValid) {
        return BAD_REQUEST(new InvalidParamError('email'))
      }
    } catch (error) {
      return SERVER_ERROR()
    }

    return OK()
  }
}
