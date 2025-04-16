import type { Database } from "$lib/types/database.types";

import { createClient } from "@supabase/supabase-js";
import { SUPABASE_SERVICE_ROLE_KEY } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";

export async function DELETE({ request }) {
  const supabaseAdmin = createClient<Database>(
    PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
  );

  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }
  const token = authHeader.split(" ")[1];
  try {
    const { data: userData, error: verificationError }
      = await supabaseAdmin.auth.getUser(token);

    if (verificationError || !userData.user) {
      return new Response("Invalid Session", { status: 401 });
    }
    const userId = userData.user.id;

    const { error: deleteUserError } =
      await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteUserError) {
      console.error("Error deleting user:", deleteUserError);
      return new Response("Failed to delete you", { status: 500 });
    }
    return new Response("You have been deleted successfully", { status: 200 });
  }
  catch (error) {
    console.error("Error deleting account:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
