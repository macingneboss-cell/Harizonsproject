export async function onRequestPost({ request, env }) {
  try {
    const { message } = await request.json();

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENROUTER_API_KEY},
          "Content-Type": "application/json",
          "HTTP-Referer": "https://harizons.ai",
          "X-Title": "Harizons AI"
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: "Kamu adalah AI asisten yang ramah dan membantu." },
            { role: "user", content: message }
          ]
        })
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
