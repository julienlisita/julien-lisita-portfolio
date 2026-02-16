// src/server/services/recruitment.mail.ts

const brevoApiKey = process.env.BREVO_API_KEY;

// Tu peux choisir une variable dédiée, sinon fallback admin
const recruitmentNotificationEmail =
  process.env.RECRUITMENT_NOTIFICATION_EMAIL ?? process.env.ADMIN_NOTIFICATION_EMAIL;

type AttachmentInput = {
  name: string; // ex: "cv.pdf"
  content: string; // base64
};

type SendApplicationAdminEmailInput = {
  jobTitle: string;
  civilite?: string;
  prenom: string;
  nom: string;
  email: string;
  message: string;
  attachments?: AttachmentInput[];
  adminEmailOverride?: string;
};

export async function sendApplicationAdminEmail({
  jobTitle,
  civilite,
  prenom,
  nom,
  email,
  message,
  attachments = [],
  adminEmailOverride,
}: SendApplicationAdminEmailInput): Promise<boolean> {
  if (!brevoApiKey) {
    console.warn('[sendApplicationAdminEmail] BREVO_API_KEY manquante, email non envoyé');
    return false;
  }

  const targetAdminEmail = adminEmailOverride ?? recruitmentNotificationEmail;
  if (!targetAdminEmail) {
    console.warn(
      '[sendApplicationAdminEmail] RECRUITMENT_NOTIFICATION_EMAIL/ADMIN_NOTIFICATION_EMAIL manquante'
    );
    return false;
  }

  const fullName = `${prenom} ${nom}`;
  const displayName = civilite ? `${civilite} ${fullName}` : fullName;

  const htmlContent = `
    <h2>Nouvelle candidature</h2>
    <p><strong>Poste :</strong> ${jobTitle}</p>
    <p><strong>Candidat :</strong> ${displayName}</p>
    <p><strong>Email :</strong> ${email}</p>
    <p><strong>Message :</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
    <p><em>CV : ${attachments.length ? 'fourni' : 'non fourni'}</em></p>
    <hr />
    <p>Email envoyé automatiquement depuis le formulaire de recrutement.</p>
  `;

  const textContent = [
    'Nouvelle candidature',
    '',
    `Poste : ${jobTitle}`,
    `Candidat : ${displayName}`,
    `Email : ${email}`,
    '',
    'Message :',
    message,
    '',
    `CV : ${attachments.length ? 'fourni' : 'non fourni'}`,
    '',
    'Email envoyé automatiquement depuis le formulaire de recrutement.',
  ].join('\n');

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
          name: 'Candidatures',
          email: 'no-reply@julienlisita.com',
        },
        to: [{ email: targetAdminEmail }],
        replyTo: { email, name: displayName },
        subject: `Nouvelle candidature – ${jobTitle}`,
        htmlContent,
        textContent,
        // Brevo: attachments = { name, content(base64) }
        attachment: attachments.map((a) => ({ name: a.name, content: a.content })),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('[sendApplicationAdminEmail] Brevo HTTP error', response.status, errorText);
      return false;
    }

    const json = await response.json().catch(() => null);
    console.log('[sendApplicationAdminEmail] email envoyé via Brevo', json);
    return true;
  } catch (err) {
    console.error('[sendApplicationAdminEmail] erreur réseau ou Brevo', err);
    return false;
  }
}
