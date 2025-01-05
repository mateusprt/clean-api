import { AccountModel } from '../../../domain/models/account'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { Encrypter } from '../../protocols/encrypter'

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
