import type { Database } from "$lib/types/database.types";

import { createClient } from "@supabase/supabase-js";
import { SUPABASE_SERVICE_ROLE_KEY } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";

export async function PATCH({ request }) {
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
    const { email, userName } = await request.json();

    const { error: updateAuthError } =
      await supabaseAdmin.auth.admin.updateUserById(userId, { email });

    if (updateAuthError) {
      console.error("Error updating email:", updateAuthError);
      return new Response("Failed to update email", { status: 500 });
    }

    const { error: updateUserNameError } = await supabaseAdmin
      .from("user_names")
      .update({ name: userName })
      .eq("user_id", userId);

    if (updateUserNameError) {
      return new Response("Failed to update username", { status: 500 });
    }
    return new Response("Account updated successfully", { status: 200 });
  }
  catch (error) {
    console.error("Error updating account:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
