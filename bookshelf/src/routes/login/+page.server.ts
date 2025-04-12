import { fail, redirect } from "@sveltejs/kit";

import type { Actions } from "./$types";

export const actions = {
  default: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const returnObject: ReturnObject = validate(email, password);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) {
      returnObject.success = false;
      console.log(returnObject);

      return fail(400, returnObject);
    }
    redirect(303, "/private/dashboard");
  },
} satisfies Actions;

///////////////////

type ReturnObject = {
  success: boolean;
  errors: string[];
  email: string;
  password: string;
  passwordConfirmation?: never;
  name?: never;
};

function validate(email: string, password: string) {
  const returnObject: ReturnObject = {
    success: true,
    errors: [],
    email,
    password,
  };

  if (!email.includes("@")) {
    returnObject.errors.push("Email must be valid");
  }

  if (!password.length) {
    returnObject.errors.push("Password is required");
  }

  returnObject.success = returnObject.errors.length === 0;
  return returnObject;
}
