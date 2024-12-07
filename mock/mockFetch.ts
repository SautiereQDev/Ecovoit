import { UserType } from "@/context/SessionProvider";

type MockFetchType = "SIGN_IN" | "SIGN_UP";

export function mockFetchData(
  type: MockFetchType,
  delay: number | undefined = 100
) {
  interface mockResponse {
    data: {
      user: UserType;
      userToken: string;
    };
  }

  // Simule une requête POST à api/auth/signin
  const fetchSignIn = () => {
    return new Promise<mockResponse>((resolve, reject) => {
      setTimeout(() => {
        const user: UserType = {
          id: 10,
          username: "maxime_chasles",
          firstName: "maxime",
          lastName: "chasles",
          password: "",
          email: "",
          bio: "",
          rank: "",
          verified: true,
        };
        const userToken = "maxime_token";
        const data = { user, userToken };

        // Simuler un succès ou une erreur
        const success = true;

        if (success) {
          resolve({ data });
        } else {
          reject(new Error("MockResponse Error"));
        }
      }, delay);
    });
  };

  switch (type) {
    case "SIGN_IN":
      return fetchSignIn();
  }
}
