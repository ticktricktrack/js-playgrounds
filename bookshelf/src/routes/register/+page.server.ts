import { createClient } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";

import type { Actions } from "./$types";

export const actions = {
  default: async (event) => {
    const formData = await event.request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordConfirmation = formData.get("passwordConfirmation") as string;

    const returnObject: ReturnObject = validate(name, email, password, passwordConfirmation);
    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error || !data.user) {
      console.error("Error signing up:", error);
      returnObject.success = true;
      return fail(400, returnObject);
    }

    redirect(303, "/private/dashboard");

    return returnObject;
  },
} satisfies Actions;

///////////////////

type ReturnObject = {
  success: boolean;
  errors: string[];
};

function validate(name: string, email: string, password: string, passwordConfirmation: string) {
  const returnObject: ReturnObject = {
    success: true,
    errors: [],
  };

  if (name.length < 3) {
    returnObject.errors.push("Name must be at least 3 characters long");
  }

  if (!email.includes("@")) {
    returnObject.errors.push("Email must be valid");
  }

  if (password.length < 6) {
    returnObject.errors.push("Password must be at least 6 characters long");
  }

  if (password !== passwordConfirmation) {
    returnObject.errors.push("Passwords do not match");
  }

  returnObject.success = returnObject.errors.length === 0;
  return returnObject;
}
