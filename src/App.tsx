import "@mantine/core/styles.css"; // Mandatory core styles
import { MantineProvider } from "@mantine/core";
import { FrontPage } from "./FrontPage";

export default function App() {
  return (
    <MantineProvider defaultColorScheme="light">
      <FrontPage />
    </MantineProvider>
  );
}
