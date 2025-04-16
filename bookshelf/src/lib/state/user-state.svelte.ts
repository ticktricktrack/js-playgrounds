import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import type { Database } from "$lib/types/database.types";

import { goto } from "$app/navigation";
import { getContext, setContext } from "svelte";

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

  async updateBook(bookId: number, updateObject: Partial<UpdateableBookFields>) {
    if (!this.supabase) {
      console.error("Supabase client is not initialized");
      return;
    }
    const { status, error } = await this.supabase
      .from("books")
      .update(updateObject)
      .eq("id", bookId);

    if (status === 204) {
      this.allBooks = this.allBooks.map((book) => {
        if (book.id === bookId) {
          return { ...book, ...updateObject };
        }
        return book;
      });
    }

    if (error) {
      console.error("Error updating book:", error);
    }
  }

  async uploadBookCoverImage(bookId: number, file: File) {
    if (!this.user || !this.supabase) {
      console.error("Supabase client is not initialized");
      return;
    }

    const fileType = file.name.split(".").pop();
    const filePath = `${this.user.id}/${bookId}.${fileType}`;

    const { data, error } = await this.supabase
      .storage
      .from("book-covers")
      .upload(filePath, file, { upsert: true });

    if (error) {
      return console.error("Error uploading book cover:", error);
    }

    const { data: { publicUrl } } = this.supabase.storage.from("book-covers").getPublicUrl(filePath);
    this.updateBook(bookId, { cover_image: publicUrl });
  }

  async addBooksToShelf(booksToAdd: OpenAiBook[]) {
    if (!this.user || !this.supabase) {
      console.error("Supabase client is not initialized");
      return;
    }
    console.log("Adding books to shelf: ", booksToAdd.length);

    const usedId = this.user.id;
    const processedBooks = booksToAdd.map(book => ({
      title: book.bookTitle,
      author: book.author,
      description: book.description,
      genre: book.genre,
      user_id: usedId,
    }));

    const { error } = await this.supabase.from("books").insert(processedBooks);
    if (error) {
      throw new Error(error.message);
    }
    this.fetchUserData();
  }

  getBookById(bookId: number) {
    return this.allBooks.find(book => book.id === bookId);
  }

  getCurrentlyReadingBooks() {
    return this.allBooks
      .filter(book => book.started_on && !book.finished_on)
      .toSorted((a, z) => new Date(z.started_on!).getTime() - new Date(a.started_on!).getTime())
      .slice(0, 10);
  }

  getHighestRatedBooks() {
    return this.allBooks
      .filter(book => book.rating)
      .toSorted((a, z) => z.rating! - a.rating!)
      .slice(0, 10);
  }

  getUnreadBooks() {
    return this.allBooks
      .filter(book => !book.started_on)
      .toSorted((a, z) => new Date(z.created_at!).getTime() - new Date(a.created_at!).getTime())
      .slice(0, 10);
  }

  getFavoriteGenre() {
    if (this.allBooks.length === 0) {
      return "";
    }
    const genreCounts: { [key: string]: number } = {};
    this.allBooks.forEach((book) => {
      const genres = book.genre
        ? book.genre
            .split(",")
            .map(genre => genre.trim())
            .filter(genre => genre !== "")
        : [];

      genres.forEach((genre) => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });

    const mostCommonGenre = Object.keys(genreCounts)
      .reduce((a, b) => genreCounts[a] > genreCounts[b] ? a : b);
    return mostCommonGenre;
  }

  getFavoriteGenreBooks() {
    return this.allBooks
      .filter(book => book.genre?.includes(this.getFavoriteGenre()))
      .toSorted((a, z) => z.rating! - a.rating!)
      .slice(0, 10);
  }

  async deleteBook(bookId: number) {
    if (!this.supabase) {
      return;
    }
    const { error, status } = await this.supabase
      .from("books")
      .delete()
      .eq("id", bookId);

    if (!error && status === 204) {
      this.allBooks = this.allBooks.filter(book => book.id !== bookId);
    }
  }

  async updateAccountDetails(userName: string, email: string) {
    if (!this.session) {
      return;
    }

    try {
      const response = await fetch("/api/update-account", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.session.access_token}`,
        },
        body: JSON.stringify({ email, userName }),
      });
    }
    catch (error) {
      console.error("Error updating account details:", error);
    }
  }

  async logout() {
    await this.supabase?.auth.signOut();
    goto("/");
  }

  async fetchUserData() {
    if (!this.user || !this.supabase)
      return;
    const userID = this.user.id;

    const [userNameResponse, booksResponse] = await Promise.all([
      this.supabase.from("user_names").select("name").eq("user_id", userID).single(),
      this.supabase.from("books").select("*").eq("user_id", userID),
    ]);

    if (booksResponse.error || userNameResponse.error || !booksResponse.data || !userNameResponse.data) {
      console.error("Error fetching user data:", booksResponse.error || userNameResponse.error);
      return;
    }

    this.allBooks = booksResponse.data;
    this.userName = userNameResponse.data.name;
  }

  async deleteAccount() {
    if (!this.session) {
      return;
    }
    try {
      const response = await fetch("/api/delete-account", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${this.session.access_token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete account");
      }
      await this.logout();
      goto("/");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  }
}

type UserStateProps = {
  session: Session | null;
  supabase: SupabaseClient | null;
  user: User | null;
  allBooks: Book[];
  userName: string | null;
};

export type Book = {
  author: string | null;
  cover_image: string | null;
  created_at: string;
  description: string | null;
  finished_on: string | null;
  genre: string | null;
  id: number;
  rating: number | null;
  started_on: string | null;
  title: string;
  user_id: string;
};

type OpenAiBook = {
  author: string;
  bookTitle: string;
  description: string;
  genre: string;
};

type UpdateableBookFields = Omit<Book, "id" | "created_at" | "user_id">;
