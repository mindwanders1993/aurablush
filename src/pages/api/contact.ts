import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    let body: any;
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      body = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries());
    } else {
      body = await request.json();
    }

    const { name, instagram, email, phone, service, message } = body || {};

    if (!name || (!instagram && !phone && !email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Please provide your name, Instagram handle, and phone number.'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const escapeHtml = (str: any) =>
      String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const igHandle = instagram ? (instagram.startsWith('@') ? instagram : `@${instagram}`) : (email || 'Not provided');

    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

    let dispatched = false;

    // 1. Dispatch to Telegram Bot
    if (telegramBotToken && telegramChatId) {
      try {
        const telegramHtml =
`🌸 <b>New Booking Request — Aura Blush Studio</b>

👤 <b>Client:</b> ${escapeHtml(name)}
📸 <b>Instagram:</b> ${escapeHtml(igHandle)}
📱 <b>Phone:</b> ${escapeHtml(phone || 'Not provided')}
✨ <b>Treatment:</b> ${escapeHtml(service || 'General Consultation')}

📝 <b>Notes & Questions:</b>
${escapeHtml(message || 'No additional notes')}

⏱️ <i>Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</i>`;

        const telegramRes = await fetch(
          `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: telegramChatId,
              text: telegramHtml,
              parse_mode: 'HTML'
            })
          }
        );

        if (telegramRes.ok) {
          dispatched = true;
        } else {
          const errData = await telegramRes.text();
          console.error('Telegram API error:', errData);
        }
      } catch (err) {
        console.error('Failed to send Telegram notification:', err);
      }
    }

    // 2. Dispatch to Discord Webhook (optional backup)
    if (discordWebhookUrl) {
      try {
        const discordRes = await fetch(discordWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'Aura Blush Inbound',
            embeds: [
              {
                title: '🌸 New Aura Blush Booking Request',
                color: 14457498, // Rose accent (#dc789a)
                fields: [
                  { name: '👤 Client Name', value: String(name), inline: true },
                  { name: '📸 Instagram', value: String(igHandle), inline: true },
                  { name: '📱 Phone', value: String(phone || 'N/A'), inline: true },
                  { name: '✨ Treatment', value: String(service || 'General Consultation'), inline: true },
                  { name: '📝 Notes', value: String(message || 'None') }
                ],
                footer: { text: 'Aura Blush Studio Varanasi' },
                timestamp: new Date().toISOString()
              }
            ]
          })
        });

        if (discordRes.ok) dispatched = true;
      } catch (err) {
        console.error('Failed to send Discord webhook:', err);
      }
    }

    if (!dispatched) {
      console.warn('⚠️ No active webhook (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID) configured in environment.');
      console.log('📥 [Aura Blush Inbound Booking]', {
        timestamp: new Date().toISOString(),
        name,
        email,
        phone,
        service,
        message
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your booking request has been received. We will be in touch within 24 hours.'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error: any) {
    console.error('Error handling booking request:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Internal server error processing booking request.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
