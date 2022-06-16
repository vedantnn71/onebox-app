import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import Button from "./components/buttons";
import Heading from "./components/headings";
import colors from "./foundations/colors";
import fonts from "./foundations/fonts";
import borders from "./foundations/borders";
import breakpoints from "./foundations/breakpoints";
import styles from "./styles";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export default extendTheme(
  {
    colors,
    fonts,
    borders,
    config,
    breakpoints,
    components: {
      Button,
      Heading,
    },
    styles: styles,
  },
  withDefaultColorScheme({ colorScheme: "red" })
);
