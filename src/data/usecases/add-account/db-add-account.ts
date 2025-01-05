import { AccountModel, AddAccount, AddAccountModel, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encryper: Encrypter

  constructor (encrypter: Encrypter) {
    this.encryper = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encryper.encrypt(account.password)
    return new Promise(resolve => resolve({
      email: '',
      id: '',
      password: '',
      name: ''
    }))
  }
}
