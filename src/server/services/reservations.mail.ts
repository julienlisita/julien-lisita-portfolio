// src/server/services/reservations.mail.ts

const brevoApiKey = process.env.BREVO_API_KEY;
const adminNotificationEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

type SendReservationConfirmationEmailInput = {
  clientEmail: string;
  clientName: string;
  slotStart: Date;
  slotEnd: Date;
};

function formatGoogleCalendarDate(date: Date): string {
  // Format attendu par Google Calendar : YYYYMMDDTHHMMSSZ
  // On part de l’ISO, on enlève les séparateurs, et on garde le Z
  const iso = date.toISOString(); // ex: 2025-11-25T18:00:00.000Z
  const base = iso.split('.')[0]; // 2025-11-25T18:00:00
  return base.replace(/[-:]/g, '') + 'Z'; // 20251125T180000Z
}

export async function sendReservationConfirmationEmail({
  clientEmail,
  clientName,
  slotStart,
  slotEnd,
}: SendReservationConfirmationEmailInput): Promise<boolean> {
  if (!brevoApiKey) {
    console.warn('[sendReservationConfirmationEmail] BREVO_API_KEY manquante, email non envoyé');
    return false;
  }

  const formatter = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

  const slotLabel = formatter.formatRange(slotStart, slotEnd);

  // Lien Google Calendar "Ajouter à mon agenda"
  const startGCal = formatGoogleCalendarDate(slotStart);
  const endGCal = formatGoogleCalendarDate(slotEnd);

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Séance de réservation'
  )}&dates=${startGCal}%2F${endGCal}&details=${encodeURIComponent(
    'Rendez-vous réservé via le site.'
  )}`;

  const htmlContent = `
    <p>Bonjour ${clientName},</p>
    <p>Votre réservation a bien été enregistrée.</p>
    <p><strong>Créneau réservé :</strong><br />${slotLabel}</p>
    <p>Vous pouvez ajouter ce rendez-vous à votre agenda en cliquant sur le lien ci-dessous :</p>
    <p>
      <a href="${googleCalendarUrl}" target="_blank" rel="noopener noreferrer"
         style="display:inline-block;padding:8px 14px;border-radius:6px;background-color:#2563eb;color:#ffffff;text-decoration:none;font-size:14px;">
        Ajouter à mon agenda
      </a>
    </p>
    <p>Si vous devez modifier ou annuler ce créneau, répondez simplement à cet email.</p>
    <p>À bientôt,</p>
    <p>L'équipe du site</p>
  `;

  const textContent = `Bonjour ${clientName},

Votre réservation a bien été enregistrée.

Créneau réservé :
${slotLabel}

Vous pouvez ajouter ce rendez-vous à votre agenda :
${googleCalendarUrl}

Si vous devez modifier ou annuler ce créneau, répondez simplement à cet email.

À bientôt,
L'équipe du site
`;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': brevoApiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Réservations',
          email: 'no-reply@julienlisita.com',
        },
        to: [
          {
            email: clientEmail,
            name: clientName,
          },
        ],
        subject: 'Confirmation de votre réservation',
        htmlContent,
        textContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error(
        '[sendReservationConfirmationEmail] Brevo HTTP error',
        response.status,
        errorText
      );
      return false;
    }

    const json = await response.json().catch(() => null);
    console.log('[sendReservationConfirmationEmail] email envoyé via Brevo', json);
    return true;
  } catch (err) {
    console.error('[sendReservationConfirmationEmail] erreur réseau ou Brevo', err);
    return false;
  }
}

/* -------------------------------------------------------------------------- */
/*  Email interne pour l'administrateur                                       */
/* -------------------------------------------------------------------------- */

type SendReservationAdminEmailInput = {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  message?: string;
  slotStart: Date;
  slotEnd: Date;
  adminEmailOverride?: string; // optionnel, pour forcer un email admin particulier
};

export async function sendReservationAdminEmail({
  clientName,
  clientEmail,
  clientPhone,
  message,
  slotStart,
  slotEnd,
  adminEmailOverride,
}: SendReservationAdminEmailInput): Promise<boolean> {
  if (!brevoApiKey) {
    console.warn('[sendReservationAdminEmail] BREVO_API_KEY manquante, email non envoyé');
    return false;
  }

  const targetAdminEmail = adminEmailOverride ?? adminNotificationEmail;
  if (!targetAdminEmail) {
    console.warn(
      '[sendReservationAdminEmail] ADMIN_NOTIFICATION_EMAIL manquante, email admin non envoyé'
    );
    return false;
  }

  const formatter = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

  const slotLabel = formatter.formatRange(slotStart, slotEnd);

  const htmlContent = `
    <h2>Nouvelle réservation reçue</h2>
    <p><strong>Créneau réservé :</strong><br />${slotLabel}</p>

    <p><strong>Client :</strong> ${clientName}</p>
    <p><strong>Email :</strong> ${clientEmail}</p>
    ${clientPhone ? `<p><strong>Téléphone :</strong> ${clientPhone}</p>` : ''}

    ${message ? `<p><strong>Message :</strong><br />${message.replace(/\n/g, '<br />')}</p>` : ''}

    <hr />
    <p>Cet email vous a été envoyé automatiquement suite à une réservation sur le site.</p>
  `;

  const textLines: string[] = [];
  textLines.push('Nouvelle réservation reçue');
  textLines.push('');
  textLines.push(`Créneau réservé :`);
  textLines.push(slotLabel);
  textLines.push('');
  textLines.push(`Client : ${clientName}`);
  textLines.push(`Email : ${clientEmail}`);
  if (clientPhone) textLines.push(`Téléphone : ${clientPhone}`);
  if (message) {
    textLines.push('');
    textLines.push('Message :');
    textLines.push(message);
  }
  textLines.push('');
  textLines.push(
    'Cet email vous a été envoyé automatiquement suite à une réservation sur le site.'
  );

  const textContent = textLines.join('\n');

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': brevoApiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Réservations',
          email: 'no-reply@julienlisita.com', // même expéditeur que le mail client
        },
        to: [
          {
            email: targetAdminEmail,
          },
        ],
        subject: 'Nouvelle réservation reçue',
        htmlContent,
        textContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('[sendReservationAdminEmail] Brevo HTTP error', response.status, errorText);
      return false;
    }

    const json = await response.json().catch(() => null);
    console.log('[sendReservationAdminEmail] email admin envoyé via Brevo', json);
    return true;
  } catch (err) {
    console.error('[sendReservationAdminEmail] erreur réseau ou Brevo', err);
    return false;
  }
}
