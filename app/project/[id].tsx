import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";

import {
  Feather,
} from "@expo/vector-icons";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

export default function ProjectDetails() {
  const { id } =
    useLocalSearchParams();

  const project = {
    title: "Campus Connect",

    category:
      "Application Design",

    description:
      "A smart student collaboration and communication platform designed for project tracking and team coordination.",

    progress: 80,

    professor: "Layek Sir",

    students: 2,

    priority: "Medium",

    milestones: "3 / 4",

    updates: 4,

    dueDate: "2026-06-01",

    teamMembers:
      "Kaniz Fatema, Alfi Sharin Ninad",

    github:
      "https://github.com/",

    pdf:
      "https://drive.google.com/",

    ppt:
      "https://drive.google.com/",
  };

  const tasks = [
    {
      title:
        "Project Planning",
      completed: true,
    },

    {
      title: "Dashboard UI",
      completed: true,
    },

    {
      title:
        "Backend Integration",
      completed: true,
    },

    {
      title:
        "Final Submission",
      completed: false,
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={
        false
      }
      contentContainerStyle={{
        paddingBottom: 120,
      }}
    >
      {/* BACK */}

      <TouchableOpacity
        onPress={() =>
          router.back()
        }
      >
        <Text style={styles.back}>
          ← Back
        </Text>
      </TouchableOpacity>

      {/* HERO */}

      <View style={styles.hero}>
        <Text
          style={styles.category}
        >
          {project.category}
        </Text>

        <Text style={styles.title}>
          {project.title}
        </Text>

        <Text
          style={
            styles.description
          }
        >
          {
            project.description
          }
        </Text>

        {/* PROGRESS */}

        <View
          style={
            styles.progressTop
          }
        >
          <Text
            style={styles.status}
          >
            On Track
          </Text>

          <Text
            style={
              styles.progressText
            }
          >
            {project.progress}%
          </Text>
        </View>

        <View
          style={
            styles.progressBg
          }
        >
          <View
            style={[
              styles.progressFill,

              {
                width: `${project.progress}%`,
              },
            ]}
          />
        </View>
      </View>

      {/* TEAM */}

      <View style={styles.card}>
        <Text
          style={styles.sectionTitle}
        >
          Team Members
        </Text>

        <View
          style={styles.memberRow}
        >
          <View
            style={
              styles.avatar
            }
          >
            <Text
              style={
                styles.avatarText
              }
            >
              K
            </Text>
          </View>

          <Text
            style={
              styles.memberName
            }
          >
            Kaniz Fatema
          </Text>
        </View>

        <View
          style={styles.memberRow}
        >
          <View
            style={
              styles.avatar
            }
          >
            <Text
              style={
                styles.avatarText
              }
            >
              N
            </Text>
          </View>

          <Text
            style={
              styles.memberName
            }
          >
            Alfi Sharin Ninad
          </Text>
        </View>
      </View>

      {/* INFO */}

      <View style={styles.card}>
        <Text
          style={styles.sectionTitle}
        >
          Project Info
        </Text>

        <InfoRow
          label="Professor"
          value={
            project.professor
          }
        />

        <InfoRow
          label="Students"
          value={String(
            project.students
          )}
        />

        <InfoRow
          label="Priority"
          value={
            project.priority
          }
        />

        <InfoRow
          label="Milestones"
          value={
            project.milestones
          }
        />

        <InfoRow
          label="Updates"
          value={String(
            project.updates
          )}
        />

        <InfoRow
          label="Deadline"
          value={
            project.dueDate
          }
        />
      </View>

      {/* TASKS */}

      <View style={styles.card}>
        <Text
          style={styles.sectionTitle}
        >
          Milestones
        </Text>

        {tasks.map(
          (task, index) => (
            <View
              key={index}
              style={
                styles.taskRow
              }
            >
              <Feather
                name={
                  task.completed
                    ? "check-circle"
                    : "circle"
                }
                size={22}
                color={
                  task.completed
                    ? "#67D56E"
                    : "#64748B"
                }
              />

              <Text
                style={
                  styles.taskText
                }
              >
                {task.title}
              </Text>
            </View>
          )
        )}
      </View>

      {/* RESOURCES */}

      <View style={styles.card}>
        <Text
          style={styles.sectionTitle}
        >
          Resources
        </Text>

        <View
          style={
            styles.resourceRow
          }
        >
          <TouchableOpacity
            style={
              styles.resourceBtn
            }
            onPress={() =>
              Linking.openURL(
                project.github
              )
            }
          >
            <Feather
              name="github"
              size={18}
              color="white"
            />

            <Text
              style={
                styles.resourceText
              }
            >
              GitHub
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.resourceBtn
            }
            onPress={() =>
              Linking.openURL(
                project.pdf
              )
            }
          >
            <Feather
              name="file-text"
              size={18}
              color="white"
            />

            <Text
              style={
                styles.resourceText
              }
            >
              PDF
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.resourceBtn
            }
            onPress={() =>
              Linking.openURL(
                project.ppt
              )
            }
          >
            <Feather
              name="monitor"
              size={18}
              color="white"
            />

            <Text
              style={
                styles.resourceText
              }
            >
              PPT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Text
        style={styles.infoLabel}
      >
        {label}
      </Text>

      <Text
        style={styles.infoValue}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 18,
  },

  back: {
    color: "#7EA6FF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 18,
  },

  hero: {
    backgroundColor: "#0F172A",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#1E293B",
    marginBottom: 18,
  },

  category: {
    color: "#7EA6FF",
    fontWeight: "800",
    marginBottom: 12,
  },

  title: {
    color: "white",
    fontSize: 34,
    fontWeight: "900",
  },

  description: {
    color: "#CBD5E1",
    lineHeight: 24,
    marginTop: 14,
    fontSize: 15,
  },

  progressTop: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    marginTop: 24,
    marginBottom: 12,
  },

  status: {
    color: "#67D56E",
    fontWeight: "900",
    fontSize: 16,
  },

  progressText: {
    color: "white",
    fontWeight: "900",
    fontSize: 18,
  },

  progressBg: {
    height: 12,
    backgroundColor: "#1E293B",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#67D56E",
    borderRadius: 20,
  },

  card: {
    backgroundColor: "#0F172A",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#1E293B",
    marginBottom: 18,
  },

  sectionTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 20,
  },

  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 100,
    backgroundColor: "#4F6EF7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  avatarText: {
    color: "white",
    fontWeight: "900",
    fontSize: 18,
  },

  memberName: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    marginBottom: 18,
  },

  infoLabel: {
    color: "#94A3B8",
    fontSize: 15,
  },

  infoValue: {
    color: "white",
    fontWeight: "800",
    fontSize: 15,
  },

  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  taskText: {
    color: "white",
    marginLeft: 14,
    fontSize: 16,
  },

  resourceRow: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },

  resourceBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4F6EF7",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
  },

  resourceText: {
    color: "white",
    fontWeight: "800",
    fontSize: 14,
  },
});