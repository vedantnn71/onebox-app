import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props: any) => ({
    body: { bg: mode("#ffffff", "#222222")(props) },
  }),
};

export default styles;
