import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import {
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import classes from "./DisplayCard.module.css";
import type { DisplayTrend } from "./Interfaces";

export function DisplayCard({ data }: { data: DisplayTrend[] }) {
  const stats = data.map((stat) => {
    const DiffIconOpening =
      stat.avg_openings_diff > 0 ? IconArrowUpRight : IconArrowDownRight;
    const ColorOpening = stat.avg_openings_diff > 0 ? "teal" : "red";
    const DiffIconDays =
      stat.avg_days_diff > 0 ? IconArrowUpRight : IconArrowDownRight;
    const ColorDays = stat.avg_days_diff > 0 ? "teal" : "red";

    return (
      <Paper
        withBorder
        p="xl"
        radius="lg"
        shadow="sm"
        key={stat.name}
        style={{
          backgroundColor: "#ffffff",
          borderColor: "#eef0f2",
        }}
      >
        <Stack gap="md">
          <Text
            fw={700}
            fz="24"
            c="bright"
            style={{
              fontFamily: "Georgia, serif",
              color: "#1a1a1a",
              lineHeight: 1.3,
              //fontSize: "24px",
            }}
          >
            {stat.name}
          </Text>
          <Divider style={{ borderColor: "#f1f3f5" }} />
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            {/* Average openings */}
            <Stack gap="4">
              <Group justify="space-between" wrap="nowrap">
                <Text
                  c="dimmed"
                  tt="uppercase"
                  fw={700}
                  fz="16"
                  className={classes.label}
                >
                  Average Openings
                </Text>
                <Text fw={800} fz="16">
                  {stat.avg_openings_val}
                </Text>
                <ThemeIcon
                  color={ColorOpening}
                  variant="light"
                  style={{
                    color:
                      stat.avg_openings_diff > 0
                        ? "var(--mantine-color-teal-6)"
                        : "var(--mantine-color-red-6)",
                  }}
                  size={42}
                  radius="md"
                >
                  <DiffIconOpening size={24} stroke={2} />
                </ThemeIcon>
              </Group>
              <Text c="dimmed" fz="sx">
                <Text
                  component="span"
                  c={stat.avg_openings_diff > 0 ? "teal" : "red"}
                  fw={700}
                >
                  {Math.abs(stat.avg_openings_diff)}%
                </Text>{" "}
                {stat.avg_openings_diff > 0 ? "increase" : "decrease"} vs last
                month
              </Text>
            </Stack>

            {/* Average Days on Market */}
            <Stack gap="4">
              <Group justify="space-between" wrap="nowrap">
                <Text
                  c="dimmed"
                  tt="uppercase"
                  fw={700}
                  fz="xs"
                  className={classes.label}
                >
                  Days on Market
                </Text>
                <Text fw={800} fz="2xl">
                  {stat.avg_days_val}
                </Text>
                <ThemeIcon
                  color={ColorDays}
                  variant="light"
                  style={{
                    color:
                      stat.avg_days_diff > 0
                        ? "var(--mantine-color-teal-6)"
                        : "var(--mantine-color-red-6)",
                  }}
                  size={42}
                  radius="md"
                >
                  <DiffIconDays size={24} stroke={2} />
                </ThemeIcon>
              </Group>
              <Text c="dimmed" fz="sx">
                <Text
                  component="span"
                  c={stat.avg_days_diff > 0 ? "teal" : "red"}
                  fw={700}
                >
                  {Math.abs(stat.avg_days_diff)}%
                </Text>{" "}
                {stat.avg_days_diff > 0 ? "increase" : "decrease"} vs last month
              </Text>
            </Stack>
          </SimpleGrid>
        </Stack>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        {stats}
      </SimpleGrid>
    </div>
  );
}
