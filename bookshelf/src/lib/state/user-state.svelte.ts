import type { Session, SupabaseClient, User } from "@supabase/supabase-js";

import { goto } from "$app/navigation";
import { getContext, setContext } from "svelte";
import type { Database } from "$lib/types/database.types";

const USER_STATE_KEY = Symbol("user-state");
export function setUserState(data: UserStateProps) {
  return setContext(USER_STATE_KEY, new UserState(data));
}

export function getUserState() {
  return getContext<ReturnType<typeof setUserState>>(USER_STATE_KEY);
}

export class UserState {
  session = $state<Session | null>(null);
  supabase = $state<SupabaseClient<Database> | null>(null);
  user = $state<User | null>(null);
  allBooks = $state<Book[]>([]);

  constructor(data: UserStateProps) {
    this.updateState(data);
  }

  updateState(data: UserStateProps) {
    this.session = data.session;
    this.supabase = data.supabase;
    this.user = data.user;
    this.fetchUserData();
  }

  async logout() {
    await this.supabase?.auth.signOut();
    goto("/login");
  }

  async fetchUserData() {
    if (!this.user || !this.supabase) return;

    const { data, error } = await this.supabase.from("books").select("*").eq("user_id", this.user.id);
    if (error) {
      console.error("Error fetching books:", error);
      return;
    }

    this.allBooks = data;
  }
}

type UserStateProps = {
  session: Session | null;
  supabase: SupabaseClient | null;
  user: User | null;
};

type Book = {
  author: string | null
  cover_image: string | null
  created_at: string
  description: string | null
  finished_on: string | null
  genre: string | null
  id: number
  rating: number | null
  started_on: string | null
  title: string
  user_id: string
}
