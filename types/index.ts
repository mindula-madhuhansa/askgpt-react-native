export enum Role {
  User = 0,
  Bot = 1,
}

export interface Message {
  role: Role;
  content: string;
  imageUrl?: string;
  prompt?: string;
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
