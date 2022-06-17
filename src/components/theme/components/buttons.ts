import type { ComponentStyleConfig } from "@chakra-ui/theme";

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "medium",
    borderRadius: "lg",
    _active: {
      transform: "scale(0.95)"
    }
  },
};

export default Button;
