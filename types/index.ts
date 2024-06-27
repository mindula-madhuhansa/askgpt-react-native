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
