import { fail, redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";

export const actions = {
  default: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordConfirmation = formData.get("passwordConfirmation") as string;

    const returnObject: ReturnObject = validate(name, email, password, passwordConfirmation);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error || !data.user) {
      console.error("Error signing up:", error);
      returnObject.success = false;
      return fail(400, returnObject);
    }

    const userId = data.user.id;
    await supabase.from("user_names").insert([
      {
        user_id: userId,
        name,
      },
    ]);
    redirect(303, "/private/dashboard");
  },
} satisfies Actions;

///////////////////

type ReturnObject = {
  success: boolean;
  errors: string[];
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

function validate(name: string, email: string, password: string, passwordConfirmation: string) {
  const returnObject: ReturnObject = {
    success: true,
    errors: [],
    name,
    email,
    password,
    passwordConfirmation,
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
