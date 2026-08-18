import { useEffect, useState } from "react";
import {
  AppShell,
  Stack,
  Text,
  Title,
  NavLink,
  ActionIcon,
  Group,
  TextInput,
  Divider,
  createTheme,
  MantineProvider,
  Container,
} from "@mantine/core";

import type { APIResponse, DisplayTrend } from "./Interfaces";
import {
  IconBuilding,
  IconMapPin,
  IconTrendingUp,
  IconSearch,
  IconBuildingSkyscraper,
  IconInfoCircle,
} from "@tabler/icons-react";
import { DisplayCard } from "./DisplayCard";
import "@mantine/core/styles.css";

export function FrontPage() {
  const [activeNav, setActiveNav] = useState("Building");
  const [searchQuery, setSearchQuery] = useState("");

  // States to hold API responses dynamically
  const [buildingData, setBuildingData] = useState<DisplayTrend[]>([]);
  const [cityData, setCityData] = useState<DisplayTrend[]>([]);
  const [companyData, setCompanyData] = useState<DisplayTrend[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const pageTheme = createTheme({
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
    fontFamilyMonospace:
      'var(--font-geist-mono), ui-monospace, "SF Mono", monospace',
    primaryColor: "dark",
  });

  const navItems = [
    { label: "Building", icon: IconBuilding },
    { label: "City", icon: IconMapPin },
    { label: "Company", icon: IconBuildingSkyscraper },
    { label: "About", icon: IconInfoCircle },
  ];

  useEffect(() => {
    fetch("https://api.vacancyinsights.com/summary")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTPS error! Status: ${res.status}`);
        return res.json();
      })
      .then((payload: APIResponse) => {
        console.log("API Response payload:", payload);

        const data = payload.data;

        if (Array.isArray(data) && data.length >= 2) {
          setBuildingData(data[0] || []);
          setCityData(data[1] || []);
          setCompanyData(data[2] || []);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Frontend fetch error:", error);
        setIsLoading(false);
      });
  }, []);

  const getActiveData = (): DisplayTrend[] => {
    switch (activeNav) {
      case "City":
        return cityData;
      case "Building":
        return buildingData;
      case "Company":
        return companyData;
      default:
        return [];
    }
  };

  const filteredData = getActiveData().filter((item) =>
    item.n.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <MantineProvider theme={pageTheme}>
      <AppShell
        header={{ height: 80 }}
        navbar={{ width: 300, breakpoint: "sm" }}
        padding={{ base: "md", sm: "xl", lg: "xl" }}
        bg="#fcfcfc"
        c="#1a1a1a"
      >
        {/*Header component */}
        <AppShell.Header
          px="xl"
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #eef0f2",
          }}
        >
          <Group gap="md">
            <ActionIcon
              variant="light"
              color="dark"
              size="xl"
              radius="xl"
              style={{ backgroundColor: "#f5f5f5" }}
            >
              <IconTrendingUp size={28} color="#1a1a1a" />
            </ActionIcon>
            <Title
              order={1}
              style={{ letterSpacing: "-0.5px", color: "#1a1a1a" }}
            >
              Apartment Listing History
            </Title>
          </Group>
        </AppShell.Header>
        {/* Navigation */}
        <AppShell.Navbar
          p="md"
          style={{
            backgroundColor: "#ffffff",
            borderRight: "1px solid #eef0f2",
          }}
        >
          <Stack gap="sm">
            <Text
              size="md"
              fw={800}
              c="dimmed"
              tt="uppercase"
              lts="1px"
              pl="xs"
              mb={6}
            >
              Filter By
            </Text>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.label;
              return (
                <NavLink
                  key={item.label}
                  label={item.label}
                  leftSection={<Icon size={22} stroke={1.5} />}
                  active={isActive}
                  onClick={() => setActiveNav(item.label)}
                  variant="subtle"
                  color="dark"
                  fw={isActive ? 700 : 400}
                  styles={{
                    root: {
                      backgroundColor: isActive ? "#f5f5f5" : "transparent",
                      color: "#1a1a1a",
                      paddingTop: "14px",
                      paddingBottom: "14px",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "#f9f9f9",
                      },
                    },
                    label: {
                      fontFamily: isActive ? "Georgia, serif" : "inherit",
                      fontSize: "17px",
                    },
                  }}
                />
              );
            })}
          </Stack>
        </AppShell.Navbar>

        {/* Main Content */}
        <AppShell.Main>
          <Container size="xl">
            <Stack gap="xl">
              {activeNav !== "About" && (
                <TextInput
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.currentTarget.value)
                  }
                  placeholder={`Search across ${activeNav.toLowerCase()} data...`}
                  size="lg"
                  radius="md"
                  leftSection={
                    <IconSearch size={20} stroke={1.5} color="#868e96" />
                  }
                  styles={{
                    input: {
                      border: "1px solid #e0e0e0",
                      backgroundColor: "#ffffff",
                      color: "#1a1a1a",
                      fontSize: "17px",
                      "&:focus": {
                        borderColor: "#1a1a1a",
                      },
                    },
                  }}
                />
              )}

              {activeNav == "About" ? (
                <Container size="md" px={0} py="xl">
                  <Stack gap="xl">
                    <Title
                      order={2}
                      style={{
                        fontFamily: "Georgia, serif",
                        letterSpacing: "-1px",
                      }}
                    >
                      About Apartment Listing History
                    </Title>

                    <Text
                      size="xl"
                      c="dimmed"
                      style={{
                        lineHeight: 1.6,
                        fontFamily: "Georgia, serif",
                        fontStyle: "italic",
                      }}
                    >
                      Making historial apartment listing trends and insights
                      accessible to the average renter
                    </Text>

                    <Divider my="md" color="#eef0f2" />

                    <Text size="lg" style={{ lineHeight: 1.7 }}>
                      The goal of this site is to equip renters with information
                      about pricing and vacancy trends for their apartment
                      complex.
                    </Text>

                    <Text size="lg" style={{ lineHeight: 1.7 }}>
                      This is a hobby / passion project. So if you have a
                      suggestion, find a bug, or want to see your apartment
                      building on the list, drop me a line at
                      v.c.elzen@gmail.com. OR if you are awesome and want to
                      contribute, you can check out the steps below on how to do
                      that. - Check out this video on how to use beautiful soup
                      to scrap apartement data and add it to this site. - Link
                      to the scraper repos written instructions on how to
                      contribute can be found here.
                    </Text>

                    <Text size="lg" style={{ lineHeight: 1.7 }}>
                      Coming soon! The ability to click into a building and see
                      trends per unit type.
                    </Text>
                  </Stack>
                </Container>
              ) : isLoading ? (
                <Text c="dimmed" ta="center" mt="xl">
                  Loading listing data...
                </Text>
              ) : filteredData.length == 0 ? (
                <Text c="dimmed" ta="center" mt="xl">
                  No data available for {activeNav}.
                </Text>
              ) : (
                <DisplayCard data={filteredData} />
              )}
            </Stack>
          </Container>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
