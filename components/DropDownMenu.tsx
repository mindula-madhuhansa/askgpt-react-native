import { Ionicons } from "@expo/vector-icons";
import * as DropdownMenu from "zeego/dropdown-menu";

import { DropDownMenuProps } from "@/types";

export default function DropDownMenu({ items, onSelect }: DropDownMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Ionicons name="ellipsis-horizontal" size={24} color={"#fff"} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        loop={false}
        side="bottom"
        align="start"
        alignOffset={0}
        avoidCollisions={true}
        collisionPadding={0}
        sideOffset={5}
      >
        {items.map((item) => (
          <DropdownMenu.Item key={item.key} onSelect={() => onSelect(item.key)}>
            <DropdownMenu.ItemTitle>{item.title}</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: item.icon,
                pointSize: 18,
              }}
            />
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
