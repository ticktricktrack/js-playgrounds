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
  userName = $state<string | null>(null);

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
    const userID = this.user.id;

    const [userNameResponse, booksResponse] = await Promise.all([
      this.supabase.from("user_names").select("name").eq("user_id", userID).single(),
      this.supabase.from("books").select("*").eq("user_id", userID),
    ])

    if (booksResponse.error || userNameResponse.error || !booksResponse.data || !userNameResponse.data) {
      console.error("Error fetching user data:", booksResponse.error || userNameResponse.error);
      return;
    }

    this.allBooks = booksResponse.data;
    this.userName = userNameResponse.data.name;
  }
}

type UserStateProps = {
  session: Session | null;
  supabase: SupabaseClient | null;
  user: User | null;
  allBooks: Book[];
  userName: string | null;
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
