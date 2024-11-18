interface mockToken {
  token: string | null;
}

export function mockLoadSecureStore() {
  return new Promise<mockToken>((resolve, reject) => {
    setTimeout(() => {
      const data = { token: "stored_token" };

      const success = false;

      if (success) {
        resolve(data);
      } else {
        reject(
          new Error("MockResponse Error : pas de token dans le SecureStore")
        );
      }
    }, 1000);
  });
}
