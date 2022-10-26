export const Component = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseClientInterface: Symbol.for('DatabaseClientInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  RentsOfferInterface: Symbol.for('RentsOfferInterface'),
  RentsOfferModel: Symbol.for('RentsOfferModel'),
  RentsOfferCommentsInterface: Symbol.for('RentsOfferCommentsInterface'),
  RentsOfferCommentModel: Symbol.for('RentsOfferCommentsModel')
} as const;
