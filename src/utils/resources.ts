export const BaseError = {
  Required: "is required",
  Exist: "already exist",
};

export const ValidationMessage = {
  // Required
  MobileRequired: `Mobile Number ${BaseError.Required}`,
  PasswordRequired: `Password ${BaseError.Required}`,
  NameRequired: `Name ${BaseError.Required}`,
  FirstNameRequired: `First Name ${BaseError.Required}`,
  LastNameRequired: `Last Name ${BaseError.Required}`,

  // Success
  SignInSuccess: "You have successfully logged in",

  // Error
  NoUserExist: `User ${BaseError.Exist}`,

  // Invalid
  InvalidEmail: "Email is not valid",
  InvalidCredentials: "Invalid username or password",
  InactiveUser: "Account has been deactivated by admin",
  InvalidConfirmPassword: "Password and Confirm Password must be same",
  SomethingWentWrong: "Something went wrong! Please try again after sometime",
  MaxLength100: "must be at most 100 characters long",
  MaxLength250: "must be at most 250 characters long",
  MaxLength500: "must be at most 500 characters long",

};