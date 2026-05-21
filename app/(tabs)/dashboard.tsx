import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const API_URL =
  "https://sheetdb.io/api/v1/sif1s2zbyslya";

const FORM_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLSd59MAxyyTne1lu0Lih_QBaUhwK4Yf-FwkZhFIf9JTbQmM0vg/viewform?usp=publish-editor";

interface Project {
  timestamp: string;
  studentName: string;
  teamMembers: string;
  projectTitle: string;
  courseName: string;
  weekNumber: string;
  progress: number;
  updateDetails: string;
  github: string;
  drive: string;
  ppt: string;
}

export default function Dashboard() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const response =
        await fetch(API_URL);

      const data =
        await response.json();

      const cleanedData =
        data.map((item: any) => ({
          timestamp:
            item.Timestamp || "",

          studentName:
            item["Student Name"] ||
            "",

          teamMembers:
            item["Team Members"] ||
            "",

          projectTitle:
            item["Project Title"] ||
            "Untitled Project",

          courseName:
            item["Course Name"] ||
            "",

          weekNumber:
            item["Week Number"] ||
            "",

          progress: parseInt(
            item[
              "Current Progress"
            ]?.replace("%", "") ||
              "0"
          ),

          updateDetails:
            item[
              "Update Details"
            ] || "",

          github:
            item[
              "GitHub Repository "
            ] || "",

          drive:
            item[
              "Google Drive Link"
            ] || "",

          ppt:
            item[
              "Figma Design Link"
            ] || "",
        }));

      setProjects(cleanedData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function getStatus(
    progress: number
  ) {
    if (progress >= 75)
      return "On Track";

    if (progress >= 50)
      return "Review";

    return "Attention";
  }

  if (loading) {
    return (
      <View
        style={
          styles.loaderContainer
        }
      >
        <ActivityIndicator
          size="large"
          color="#4F6EF7"
        />

        <Text
          style={{
            color: "white",
            marginTop: 10,
          }}
        >
          Loading Dashboard...
        </Text>
      </View>
    );
  }

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
      

      {/* FORM */}

      <View style={styles.formCard}>
        <View>
          <Text
            style={styles.formTitle}
          >
            Weekly Submission Form
          </Text>

          <Text
            style={styles.formSubtitle}
          >
            Students can submit
            weekly updates here.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.formBtn}
          onPress={() =>
            Linking.openURL(
              FORM_LINK
            )
          }
        >
          <Text
            style={styles.formBtnText}
          >
            Open Form
          </Text>
        </TouchableOpacity>
      </View>

      {/* PROJECTS */}

      <Text style={styles.section}>
        Projects Overview
      </Text>

      {projects.map(
        (project, index) => {
          const status =
            getStatus(
              project.progress
            );

          return (
            <View
              key={index}
              style={
                styles.projectCard
              }
            >
              {/* TOP */}

              <View
                style={
                  styles.projectTop
                }
              >
                <View
                  style={{ flex: 1 }}
                >
                  <Text
                    style={
                      styles.projectTitle
                    }
                  >
                    {
                      project.projectTitle
                    }
                  </Text>

                  <Text
                    style={
                      styles.course
                    }
                  >
                    {
                      project.courseName
                    }
                  </Text>
                </View>

                <Text
                  style={
                    styles.percent
                  }
                >
                  {
                    project.progress
                  }
                  %
                </Text>
              </View>

              {/* TEAM */}

              <Text
                style={
                  styles.teamText
                }
              >
                👥{" "}
                {
                  project.teamMembers
                }
              </Text>

              {/* BAR */}

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

                    status ===
                      "On Track" &&
                      styles.green,

                    status ===
                      "Review" &&
                      styles.orange,

                    status ===
                      "Attention" &&
                      styles.red,
                  ]}
                />
              </View>

              {/* FOOTER */}

              <View
                style={
                  styles.projectFooter
                }
              >
                <Text
                  style={[
                    styles.status,

                    status ===
                      "On Track" &&
                      styles.greenText,

                    status ===
                      "Review" &&
                      styles.orangeText,

                    status ===
                      "Attention" &&
                      styles.redText,
                  ]}
                >
                  {status}
                </Text>

                <Text
                  style={
                    styles.week
                  }
                >
                  {
                    project.weekNumber
                  }
                </Text>
              </View>

              {/* UPDATE */}

              <View
                style={
                  styles.updateBox
                }
              >
                <Text
                  style={
                    styles.updateLabel
                  }
                >
                  Recent Update
                </Text>

                <Text
                  style={
                    styles.updateText
                  }
                >
                  {
                    project.updateDetails
                  }
                </Text>
              </View>

              {/* RESOURCES */}

              <View
                style={
                  styles.resourceRow
                }
              >
                {project.github ? (
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
                    <Text
                      style={
                        styles.resourceText
                      }
                    >
                      GitHub
                    </Text>
                  </TouchableOpacity>
                ) : null}

                {project.drive ? (
                  <TouchableOpacity
                    style={
                      styles.resourceBtn
                    }
                    onPress={() =>
                      Linking.openURL(
                        project.drive
                      )
                    }
                  >
                    <Text
                      style={
                        styles.resourceText
                      }
                    >
                      PDF
                    </Text>
                  </TouchableOpacity>
                ) : null}

                {project.ppt ? (
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
                    <Text
                      style={
                        styles.resourceText
                      }
                    >
                      PPT
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          );
        }
      )}

      {/* RECENT ACTIVITY */}

      <Text style={styles.section}>
        Recent Activity
      </Text>

      <View style={styles.activityCard}>
        {projects.map(
          (project, index) => (
            <View
              key={index}
              style={
                styles.activityItem
              }
            >
              <View
                style={
                  styles.dot
                }
              />

              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={
                    styles.activityText
                  }
                >
                  <Text
                    style={{
                      fontWeight:
                        "900",
                    }}
                  >
                    {
                      project.studentName
                    }
                  </Text>{" "}
                  updated{" "}
                  <Text
                    style={{
                      color:
                        "#7EA6FF",
                      fontWeight:
                        "700",
                    }}
                  >
                    {
                      project.projectTitle
                    }
                  </Text>
                </Text>

                <Text
                  style={
                    styles.activityUpdate
                  }
                >
                  {
                    project.updateDetails
                  }
                </Text>

                <Text
                  style={
                    styles.activityTime
                  }
                >
                  {
                    project.timestamp
                  }
                </Text>
              </View>
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 18,
  },

  loaderContainer: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: "#0F172A",
    borderRadius: 24,
    padding: 24,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#1E293B",
  },

  logo: {
    color: "#7EA6FF",
    fontWeight: "900",
    fontSize: 16,
  },

  title: {
    color: "white",
    fontSize: 36,
    fontWeight: "900",
    marginTop: 10,
  },

  subtitle: {
    color: "#CBD5E1",
    marginTop: 12,
    lineHeight: 22,
    fontSize: 15,
  },

  formCard: {
    backgroundColor: "#0F172A",
    borderRadius: 22,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#1E293B",

    flexDirection: "column",
    alignItems: "flex-start",
  },

  formTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "900",
  },

  formSubtitle: {
    color: "#CBD5E1",
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
  },

  formBtn: {
    backgroundColor: "#4F6EF7",
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 18,
    alignSelf: "flex-start",
  },

  formBtnText: {
    color: "white",
    fontWeight: "900",
    fontSize: 15,
  },

  section: {
    color: "white",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 18,
  },

  projectCard: {
    backgroundColor: "#0F172A",
    borderRadius: 24,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#1E293B",
  },

  projectTop: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  projectTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "900",
  },

  course: {
    color: "#94A3B8",
    marginTop: 6,
    fontSize: 15,
  },

  percent: {
    color: "#7EA6FF",
    fontSize: 30,
    fontWeight: "900",
    marginLeft: 12,
  },

  teamText: {
    color: "#E2E8F0",
    marginTop: 18,
    fontSize: 16,
    lineHeight: 24,
  },

  progressBg: {
    height: 12,
    backgroundColor: "#1E293B",
    borderRadius: 20,
    marginTop: 20,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 20,
  },

  green: {
    backgroundColor: "#67D56E",
  },

  orange: {
    backgroundColor: "#F59E0B",
  },

  red: {
    backgroundColor: "#EF4444",
  },

  projectFooter: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginTop: 18,
  },

  status: {
    fontWeight: "900",
    fontSize: 16,
  },

  greenText: {
    color: "#67D56E",
  },

  orangeText: {
    color: "#F59E0B",
  },

  redText: {
    color: "#EF4444",
  },

  week: {
    color: "#94A3B8",
    fontSize: 16,
  },

  updateBox: {
    backgroundColor: "#111C34",
    borderRadius: 18,
    padding: 18,
    marginTop: 18,
  },

  updateLabel: {
    color: "#7EA6FF",
    fontWeight: "800",
    marginBottom: 10,
    fontSize: 16,
  },

  updateText: {
    color: "white",
    lineHeight: 24,
    fontSize: 15,
  },

  resourceRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
    flexWrap: "wrap",
  },

  resourceBtn: {
    backgroundColor: "#4F6EF7",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
  },

  resourceText: {
    color: "white",
    fontWeight: "800",
    fontSize: 14,
  },

  activityCard: {
    backgroundColor: "#0F172A",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1E293B",
  },

  activityItem: {
    flexDirection: "row",
    marginBottom: 22,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 100,
    backgroundColor: "#5B7FFF",
    marginTop: 8,
    marginRight: 14,
  },

  activityText: {
    color: "white",
    fontSize: 15,
    lineHeight: 24,
  },

  activityUpdate: {
    color: "#CBD5E1",
    marginTop: 8,
    fontSize: 14,
  },

  activityTime: {
    color: "#64748B",
    marginTop: 8,
    fontSize: 12,
  },
});