import { fail, isActionFailure } from "@sveltejs/kit";
import type { Actions } from "./$types";

function getOr400(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    throw fail(400, { error: "Invalid request" });
  }
  return value;
}

interface LoginSuccess {
  token: string;
}

export const actions = {
  default: async ({ request, fetch, cookies }) => {
    const data = await request.formData();

    try {
      const action = getOr400(data, "action");
      const username = getOr400(data, "username");
      const password = getOr400(data, "password");

      if (username === "") return fail(400, { error: "Username must not be empty" });
      if (password === "") return fail(400, { error: "Password must not be empty" });

      const login = async () => {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          cookies.set("token", data.token, { path: "/" });
          return { success: true };
        } else {
          return fail(res.status, { error: data.error ?? "Cannot login" });
        }
      };

      if (action === "signup") {
        const email = getOr400(data, "email");
        if (email === "") return fail(400, { error: "Email must not be empty" });

        const gender = getOr400(data, "gender");
        if (gender === "") return fail(400, { error: "You must select an appearance" });

        const res = await fetch("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify({ username, email, password, gender }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          return await login();
        }
      } else if (action === "login") {
        return await login();
      }
    } catch (err) {
      if (isActionFailure(err)) {
        return err;
      } else {
        throw err;
      }
    }
  },
} satisfies Actions;
