"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Statistics() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .neq("role", "teacher")
        .order("scores", { ascending: false });

      if (error) throw error;
      setStudents(data);
    } catch (error: any) {
      console.error("Ошибка загрузки данных:", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Статистика студентов</h1>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Имя</th>
              <th style={styles.th}>Баллы</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id} style={styles.tr}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{student.name}</td>
                <td style={styles.td}>{student.scores}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        style={styles.navigateButton}
        onClick={() => router.push("/main")}
      >
        Перейти на главную страницу
      </button>
    </div>
  );
}

const styles: {
  container: React.CSSProperties;
  header: React.CSSProperties;
  table: React.CSSProperties;
  th: React.CSSProperties;
  tr: React.CSSProperties;
  td: React.CSSProperties;
  navigateButton: React.CSSProperties;
  navigateButtonHover: React.CSSProperties;
} = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    padding: "20px",
  },
  header: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    maxWidth: "600px",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  th: {
    backgroundColor: "#0070f3",
    color: "#fff",
    padding: "10px",
    textAlign: "left",
    fontWeight: "bold",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px",
    textAlign: "left",
    fontSize: "1rem",
  },
  navigateButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  navigateButtonHover: {
    backgroundColor: "#0056b3",
  },
};
