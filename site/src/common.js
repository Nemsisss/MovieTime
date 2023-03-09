export const getToken = (credentials:any) => {
    const token = 'abccss';
    if (
      credentials.username === 'test@test.com' &&
      credentials.password === '123'
    ) {
      return token;
    } else {
      return null;
    }
  };

  export const handleSubmit = (e:any, email:string, pwd: string) => {
    e.preventDefault();
    const token = getToken({ username: email, password: pwd });
    if (token) {
      // authCon.login(token);
      window.location.href = '/dashboard';
    }
  };