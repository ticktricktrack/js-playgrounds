import type { RequestHandler } from "@sveltejs/kit";

import { redirect } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
  console.log("Github hittin callback...");
  const code = url.searchParams.get("code");

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const sessionData = await supabase.auth.getSession();

  if (sessionData.data.session) {
    console.log("Session data:", sessionData.data.session.user);
    throw redirect(303, "/private/dashboard");
  }

  return new Response("No session found", { status: 400 });
};
