
export async function onRequestPost({ request, env }) {
  const { messages } = await request.json()

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://harizons.ai',
      'X-Title': 'Harizons.ai'
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o-mini',
      stream: true,
      messages
    })
  })

  return new Response(res.body, { headers: { 'Content-Type': 'text/plain' } })
}
