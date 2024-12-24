import { AddAccount } from '../../domain/usecases/add-account'
import { MissingParamError, InvalidParamError } from '../errors'
import { BAD_REQUEST, OK, SERVER_ERROR } from '../helpers/http-helper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return BAD_REQUEST(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return BAD_REQUEST(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email as string)
      if (!isValid) {
        return BAD_REQUEST(new InvalidParamError('email'))
      }
      this.addAccount.add({
        name,
        email,
        password
      })
    } catch (error) {
      return SERVER_ERROR()
    }

    return OK()
  }
}
