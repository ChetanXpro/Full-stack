const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export function ValidateEmail(input: string) {
  if (input.match(EMAIL_REGEX)) {
    return true;
  } else {
    return false;
  }
}

const PASSWORD_REGEX = /^.{6,}$/;

export function ValidatePassword(input: string) {
  if (input.match(PASSWORD_REGEX)) {
    return true;
  } else {
    return false;
  }
}
