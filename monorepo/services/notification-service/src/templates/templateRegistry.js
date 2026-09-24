import ApiError from "../../../../packages/server-utils/src/api-error.js";
import { renderTemplate } from "./templateEngine.js";

export const TEMPLATE_REGISTRY = {
  ACCOUNT_CREATED: {
    title: "Account Created Successfully",
    messageTemplate:
      "Welcome {{name}}! Your Umar Vault account was created on {{date}}.",
    requiredFields: ["name", "date"],
  },
  PASSWORD_UPDATED: {
    title: "Security Alert: Password Changed",
    messageTemplate:
      "Your password was updated on {{date}} from {{device}} (IP: {{ip}}).",
    requiredFields: ["date", "device", "ip"],
  },
  EMAIL_UPDATED: {
    title: "Security Alert: Email Updated",
    messageTemplate:
      "Your Umar Vault email was successfully updated on {{date}}.",
    requiredFields: ["date"],
  },
  FESTIVAL_WISHES: {
    title: "Happy {{festivalName}}!",
    messageTemplate:
      "Dear {{name}}, team Umar Vault wishes you and your family a joyful {{festivalName}}!",
    requiredFields: ["name", "festivalName"],
  },
};

export function compileNotificationContent(templateKey, params = {}) {
  const templateDef = TEMPLATE_REGISTRY[templateKey];

  if (!templateDef) {
    throw ApiError.badRequest(
      `Invalid or unregistered templateKey: "${templateKey}". Notification dropped.`,
    );
  }

  const title = renderTemplate(
    templateDef.title,
    params,
    templateDef.requiredFields.filter((f) =>
      templateDef.title.includes(`{{${f}}}`),
    ),
  );

  const message = renderTemplate(
    templateDef.messageTemplate,
    params,
    templateDef.requiredFields,
  );

  return { title, message };
}
