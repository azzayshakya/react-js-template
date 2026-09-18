const nodemailer = require("nodemailer");

/**
 * createMailer(config, logger) -> { sendMail, getMailStatus }
 *
 * config shape: { host, port, secure, user, pass, from }
 * Works with any SMTP relay - Mailjet, Gmail, SES SMTP, etc. Verifies the
 * connection once at startup (readyPromise) instead of on every send, so a
 * bad config fails fast in the logs rather than on the first user request.
 */
function createMailer(config, logger = console) {
  const { host, port, secure, user, pass, from } = config;

  let transporter = null;

  const readyPromise = new Promise((resolve, reject) => {
    if (!host || !user || !pass) {
      const msg = "Mailer misconfigured: missing SMTP_HOST/SMTP_USER/SMTP_PASS";
      logger.error(msg);
      reject(new Error(msg));
      return;
    }

    transporter = nodemailer.createTransport({
      host,
      port,
      secure, // true for port 465, false for 587/STARTTLS
      auth: { user, pass },
      pool: true, // reuse connections instead of opening one per mail
      maxConnections: 5,
    });

    transporter.verify((err) => {
      if (err) {
        logger.error(`Mailer failed to initialize: ${err.message}`);
        reject(err);
      } else {
        logger.info("Mailer connected and ready to send");
        resolve(true);
      }
    });
  });

  readyPromise.catch(() => {}); // prevent unhandled rejection if never awaited

  async function sendMail({ to, subject, text, html }) {
    if (!to || !subject || (!text && !html)) {
      throw new Error("sendMail requires: to, subject, and text or html");
    }

    await readyPromise; // throws if mailer never connected

    const info = await transporter.sendMail({ from, to, subject, text, html });
    logger.info(`Mail sent to ${to} | subject: "${subject}" | id: ${info.messageId}`);
    return info;
  }

  async function getMailStatus() {
    try {
      await readyPromise;
      return true;
    } catch {
      return false;
    }
  }

  return { sendMail, getMailStatus };
}

module.exports = createMailer;
