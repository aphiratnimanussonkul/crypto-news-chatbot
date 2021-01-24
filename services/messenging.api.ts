import { httpClient } from "../lib/http.client";
import { MessageRequest, MessageType } from "../models/message.request";
const config = {
  pageAccessToken:
    "EAAVpcuDu4LQBABxFdFz4JeBDZBFQQ138bhtwDzXJfCMLOY4eCIu7WkYjqBRYXk08OyZCyes3rZAAjQYwWAOoZCreUzX3RREMSVURdIdLFAIrAundgoC8darPMbZA1zVp3xGXN7VX60b9TD6f97tnATqRft2yGfeAPFcl7467ZAAwZDZD",
  baseUrl: "https://graph.facebook.com/v9.0/me/messages",
};

export const sendMessageToUser = async (
  message: string,
  receiveId: number
): Promise<any> => {
  let messageRequest: MessageRequest = {
    messaging_type: MessageType.UPDATE,
    message: {
      text: message,
    },
    recipient: {
      id: receiveId,
    },
  };

  return await httpClient.post(`${config.baseUrl}`, messageRequest, {
    params: {
      access_token: config.pageAccessToken,
    },
  });
};
