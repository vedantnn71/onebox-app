import { Text } from "@chakra-ui/react";
import { FC } from "react";

interface IconProps {
  name: string;
  size?: string;
  color?: string;
  active?: boolean;
}

const Icon: FC<IconProps> = ({
  name,
  size = "2xl",
  color = "blackAlpha.800",
  active = false,
  ...props
}) => (
  <Text
    className={`bx ${name}`}
    fontSize={size}
    color={color}
    padding={2}
    borderRadius="md"
    backgroundColor={active ? "white" : ""}
    boxShadow={active ? "sm" : ""}
    {...props}
  ></Text>
);

export default Icon;
