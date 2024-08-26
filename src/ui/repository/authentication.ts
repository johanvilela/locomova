import {
  AuthCredential,
  AuthRepositoryAuthenticateOutput,
  AuthRepositoryAuthenticateOutputSchema,
} from "@ui/schema/authentication";

async function authenticate({
  username,
  password,
}: AuthCredential): Promise<AuthRepositoryAuthenticateOutput> {
  const serverResponse = await fetch("api/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!serverResponse.ok) {
    throw new Error("Failed to authenticate");
  }

  const response = await serverResponse.json();

  const parsedData = AuthRepositoryAuthenticateOutputSchema.safeParse(response);
  if (!parsedData.success) {
    throw new Error("Failed to parse data from API");
  }

  const parsedResponse = parsedData.data;

  return parsedResponse;
}

export const authRepository = {
  authenticate,
};
