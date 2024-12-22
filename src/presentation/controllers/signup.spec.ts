import { SignUpController } from './signup'

describe('SignUp Controlller', () => {
  test('should return 400 if no name is provided', () => {
    const sut = new SignUpController() // sut = system under test
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        password_confirmation: 'any_password_confirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
