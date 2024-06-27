import { View, Text } from "react-native";
import * as DropdownMenu from "zeego/dropdown-menu";

import { Colors } from "@/constants";
import { HeaderDropDownProps } from "@/types";

export default function HeaderDropDown({
  title,
  selected,
  items,
  onSelect,
}: HeaderDropDownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>{title}</Text>
          {selected && (
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "500",
                color: Colors.greyLight,
              }}
            >
              {selected} ▼
            </Text>
          )}
        </View>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align={{ x: "right", y: "top" }}
        alignOffset={{ x: 0, y: 10 }}
        avoidCollisions={false}
        loop={false}
        side={"bottom"}
        sideOffset={10}
        collisionPadding={10}
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
