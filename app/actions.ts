"use server"

import { cookies } from "next/headers"
import { AthletePreview } from "@/models/athlete"
import { TeamPreview } from "@/models/team"

export async function loadMoreAthletesAction(query: string, offset: number): Promise<AthletePreview[]> {
  const url = query
    ? `https://api.mykayak.fuffo.net/athletes?name_hint=${encodeURIComponent(query)}&limit=40&offset=${offset}`
    : `https://api.mykayak.fuffo.net/athletes?limit=40&offset=${offset}`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error("Failed to load more athletes:", e);
    return [];
  }
}

export async function loadMoreTeamsAction(query: string, offset: number): Promise<TeamPreview[]> {
  const url = query
    ? `https://api.mykayak.fuffo.net/teams?hint=${encodeURIComponent(query)}&limit=40&offset=${offset}`
    : `https://api.mykayak.fuffo.net/teams?limit=40&offset=${offset}`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error("Failed to load more teams:", e);
    return [];
  }
}

export async function setChampionshipAction(meet_id: string, is_championship: boolean): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return false;

  try {
    const res = await fetch(`https://api.mykayak.fuffo.net/meets/${meet_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ is_championship }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
