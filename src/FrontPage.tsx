import { useState } from "react";
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

import type { DisplayTrend } from "./Interfaces";
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

  const cityData: DisplayTrend[] = [
    {
      name: "Madison",
      avg_openings_val: 30,
      avg_openings_diff: -5,
      avg_days_val: 20,
      avg_days_diff: 5,
    },
    {
      name: "Verona",
      avg_openings_val: 20,
      avg_openings_diff: 5,
      avg_days_val: 10,
      avg_days_diff: -5,
    },
    {
      name: "Middleton",
      avg_openings_val: 35,
      avg_openings_diff: 0,
      avg_days_val: 25,
      avg_days_diff: -5,
    },
  ];

  const buildingData: DisplayTrend[] = [
    {
      name: "Prairie Crest Apartments",
      avg_openings_val: 9,
      avg_openings_diff: -1,
      avg_days_val: 15,
      avg_days_diff: 20,
    },
    {
      name: "Lincoln Street Apartments",
      avg_openings_val: 11,
      avg_openings_diff: 5,
      avg_days_val: 20,
      avg_days_diff: -2,
    },
    {
      name: "Siena Ridge Apartments",
      avg_openings_val: 5,
      avg_openings_diff: -2,
      avg_days_val: 5,
      avg_days_diff: 2,
    },
    {
      name: "Whispering Hills Apartments",
      avg_openings_val: 15,
      avg_openings_diff: 7,
      avg_days_val: 30,
      avg_days_diff: 10,
    },
  ];

  const getActiveData = (): DisplayTrend[] => {
    switch (activeNav) {
      case "City":
        return cityData;
      case "Building":
        return buildingData;
      default:
        return [];
    }
  };

  const filteredData = getActiveData().filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
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
                      Tracking the evolution of regional housing markets through
                      data-driven insights.
                    </Text>

                    <Divider my="md" color="#eef0f2" />

                    <Text size="lg" style={{ lineHeight: 1.7 }}>
                      Welcome to the Apartment Listing History archive. This
                      platform serves as a comprehensive repository monitoring
                      historical availability, optimal pricing, and leasing
                      cycles across properties, municipalities, and managing
                      enterprises.
                    </Text>

                    <Text size="lg" style={{ lineHeight: 1.7 }}>
                      By evaluating metrics such as average active openings and
                      duration on market, our analytical tools equip landlords,
                      investors, and municipal planners with the empirical data
                      necessary to understand market velocity and broader
                      regional housing trends.
                    </Text>
                  </Stack>
                </Container>
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
