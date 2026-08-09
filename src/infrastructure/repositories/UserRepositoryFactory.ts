import { UserRepository } from './UserRepository';

export class UserRepositoryFactory {
  static create() {
    return new UserRepository();
  }
}