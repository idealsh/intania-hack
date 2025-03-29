import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

function getOr400(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return fail(400, { message: "Invalid request" });
  }
  return value;
}

interface LoginSuccess {
  token: string;
}

export const actions = {
  default: async ({ request, fetch, cookies }) => {
    const data = await request.formData();
    const action = getOr400(data, "action");
    const username = getOr400(data, "username");
    const password = getOr400(data, "password");

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

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
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
  },
} satisfies Actions;
