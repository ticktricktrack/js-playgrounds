import { EMAIL_API_KEY } from "$env/static/private";
// no actual email is sent, just a test

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export async function POST({ request }) {
  await delay(3000);
  // throw "not you!";
  // const data = await request.json();
  return new Response(JSON.stringify({ message: "Email sent successfully!" }), { status: 200 });
}
