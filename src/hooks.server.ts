import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  if (event.route.id?.startsWith("/(authenticated)")) {
    if (event.cookies.get("token") === undefined) {
      redirect(303, "/login");
    }
  }

  const response = await resolve(event);
  return response;
};
