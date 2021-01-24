export interface MessageRequest {
  messaging_type: MessageType;
  recipient: {
    id: number;
  };
  message: {
    text: string;
  };
}

export enum MessageType {
  UPDATE = "UPDATE",
}
