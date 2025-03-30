import type { Stats } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch("/api/user/profile");

  if (res.ok) {
    const data = await res.json();
    return {
      name: data.name as string,
      level: data.level as number,
      xp: data.currentXP as number,
      streak: data.streak as number,
      isBoy: data.isBoy as boolean,
      stats: data.stats as Stats,
      oneIslandFinished: data.oneIslandFinished as boolean,
      allIslandsFinished: data.allIslandsFinished as boolean,
    };
  } else {
    error(500, { message: "API Error" });
  }
};
