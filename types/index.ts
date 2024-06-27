export enum Role {
  User = "user",
  Bot = "model",
}

export interface Message {
  role: Role;
  parts: [{ text: string }];
}

export interface Chat {
  id: number;
  title: string;
}

export type HeaderDropDownProps = {
  title: string;
  items: Array<{
    key: string;
    title: string;
    icon: string;
  }>;
  selected?: string;
  onSelect: (key: string) => void;
};

export type MessageInputProps = {
  onShouldSendMessage: (message: string) => void;
};

export type MessageIdeasProps = {
  onSelectCard: (message: string) => void;
};
