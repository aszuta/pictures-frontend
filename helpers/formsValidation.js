export const pictureValidation = (pictureValues) => {
  const { title, file } = pictureValues;
  const errors = {};

  if (title === '' || undefined) {
    errors.titleError = 'Wymagany jest tytuł.';
  } else if (title.length < 3) {
    errors.titleError = 'Tytuł powinien zawierać przynajmniej 3 litery.';
  }

  if (file === null) {
    errors.fileError = 'Wymagany jest obraz.';
  }

  if (Object.keys(errors).length === 0) {
    return { success: true };
  }
  return { errors };
};

export const userValidation = (userValues) => {
  const { name, password, email } = userValues;
  const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const errors = {};

  if (name === '' || undefined) {
    errors.nameError = 'Wymagane jest imię.';
  } else if (name.length < 3) {
    errors.nameError = 'Imię powinno zawierać przynajmniej 3 litery.';
  }

  if (email === '' || undefined) {
    errors.emailError = 'Wymagany jest email.';
  } else if (!email.match(emailRegExp)) {
    errors.emailError = 'Nieprawidłowy email.';
  }

  if (password === '' || undefined) {
    errors.passwordError = 'Wymagane jest hasło.';
  } else if (password.length < 3) {
    errors.passwordError = 'Hasło powinno zawierać przynajmniej 3 litery.';
  }

  if (Object.keys(errors).length === 0) {
    return { success: true };
  }
  return { errors };
};

export const commentValidation = (commentValues) => {
  const { content } = commentValues;
  const errors = {};

  if (content === '' || undefined) {
    errors.contentError = 'Proszę dodać treść komentarza.';
  } else if (content.length < 3) {
    errors.contentError = 'Komentarz powinien zawierać przynajmniej 3 litery.';
  }

  if (Object.keys(errors).length === 0) {
    return { succes: true };
  }
  return { errors };
};
