import {
  Paper,
  Stack,
  SimpleGrid,
  Group,
  Text,
  Badge,
  Divider,
} from "@mantine/core";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import type { DisplayTrend } from "./Interfaces";

export function DisplayCard({ data }: { data: DisplayTrend[] }) {
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
      {data.map((stat) => {
        // Evaluate trends matching the site's reporting format
        const isOpeningsUp = stat.aod > 0;
        const isDaysUp = stat.add > 0;

        return (
          <Paper
            key={stat.n}
            withBorder
            p="xl"
            radius="md"
            shadow="sm"
            style={{
              backgroundColor: "#ffffff",
              borderColor: "#eef0f2",
            }}
          >
            <Stack gap="sm">
              {/* Header */}
              <Text
                fw={700}
                fz="28"
                style={{
                  //fontFamily: "Georgia, serif",
                  color: "#1a1a1a",
                  lineHeight: 1.3,
                }}
              >
                {stat.n}
              </Text>

              <Divider style={{ borderColor: "#f1f3f5" }} />

              {/* Metrics Grid */}
              <SimpleGrid cols={2} spacing="sm">
                {/* Average Openings Segment */}
                <Stack gap={4}>
                  <Text c="dimmed" tt="uppercase" fw={700} fz="md" lts="0.5px">
                    Avg Openings
                  </Text>

                  <Group gap="xs" align="baseline">
                    <Text
                      fw={700}
                      fz="24"
                      style={{ color: "#1a1a1a", letterSpacing: "-1px" }}
                    >
                      {stat.aov}
                    </Text>

                    {/*Inline Badge */}
                    <Badge
                      variant="light"
                      color={isOpeningsUp ? "#c8632b" : "#2f7d6b"}
                      radius="sm"
                      size="lg"
                      leftSection={
                        isOpeningsUp ? (
                          <IconArrowUpRight size={20} />
                        ) : (
                          <IconArrowDownRight size={20} />
                        )
                      }
                      styles={{
                        root: {
                          paddingLeft: 4,
                          paddingRight: 6,
                          fontWeight: 700,
                        },
                        label: {
                          fontSize: "16px",
                        },
                      }}
                    >
                      {Math.abs(stat.aod)}%
                    </Badge>
                  </Group>

                  <Text c="dimmed" fz="sm">
                    {isOpeningsUp ? "More listings" : "Fewer listings"} MoM
                  </Text>
                </Stack>

                {/* Days on Market Segment */}
                <Stack gap={4}>
                  <Text c="dimmed" tt="uppercase" fw={700} fz="md" lts="0.5px">
                    Days on Market
                  </Text>

                  <Group gap="xs" align="baseline">
                    <Text
                      fw={700}
                      fz="24"
                      style={{ color: "#1a1a1a", letterSpacing: "-1px" }}
                    >
                      {stat.adv}
                    </Text>

                    <Badge
                      variant="light"
                      color={isDaysUp ? "#c8632b" : "#2f7d6b"} // Days on market up is usually negative/red
                      radius="sm"
                      size="lg"
                      leftSection={
                        isDaysUp ? (
                          <IconArrowUpRight size={20} />
                        ) : (
                          <IconArrowDownRight size={20} />
                        )
                      }
                      styles={{
                        root: {
                          paddingLeft: 4,
                          paddingRight: 6,
                          fontWeight: 700,
                        },
                        label: {
                          fontSize: "16px",
                        },
                      }}
                    >
                      {Math.abs(stat.add)}%
                    </Badge>
                  </Group>

                  <Text c="dimmed" fz="sm">
                    {isDaysUp ? "Slower velocity" : "Faster velocity"} MoM
                  </Text>
                </Stack>
              </SimpleGrid>
            </Stack>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
}
