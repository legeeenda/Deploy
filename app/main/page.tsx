"use client";
import { createClient } from "../../utils/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../main/TestPage.css";


export default function StudentDashboard() {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true); 
    const router = useRouter();
    const supabase = createClient();


    // test@test.com   123123
    // 222@com.ru 123123
    // users@mail.ru 123123

    useEffect(() => {

        const fetchStudentData = async () => {
            const { data: user, error: userError } = await supabase.auth.getUser();

            if (userError) {
                console.error("Ошибка при получении пользователя:", userError);
                router.push("/auth");
                return;
            }

            if (user && user.user) {
                const { data, error } = await supabase
                    .from("students")
                    .select("*")
                    .eq("user_id", user.user.id)
                    .maybeSingle(); 

                if (error) {
                    console.error("Ошибка при получении данных студента:", error);
                } else if (!data) {
                    console.log("Данные студента не найдены.");
                } else {
                    setStudent(data); 
                }
            } else {
        
                router.push("/auth");
            }

            setLoading(false); 
        };

        fetchStudentData();
    }, []);

    if (loading) {
        return <p>Loading...</p>; 
    }

    if (!student) {
        return <p>Данные студента не найдены</p>; 
    }
    

return (
  <div className="dashboard-container">
    <div className="header">
      <div className="namecomp">
        <h1>Обучающая платформа</h1>
      </div>
      <div className="user-info">
        <img className="avatar" alt="" />
        <span className="student-name">{student.name}</span>
      </div>
    </div>

    <div className="main-content">
      <div className="left-menu">
        <ul>
          <li><a href="Task">Домашние задания</a></li>
          <li><a href="schedule">Расписание студента</a></li>
          <li><a href="edu">Программа Обучения</a></li>
          <li><a href="stats">Статистика студентов</a></li>
        </ul>
      </div>

      <div className="right-content">
        <h2>Добро пожаловать, {student.name}!</h2>

        <div className="overview-grid">
          <div className="card">
            <h3>Прогресс обучения</h3>
            <p>Вы завершили 60% курсов</p>
          </div>
          <div className="card">
            <h3>Последние уведомления</h3>
            <ul>
              <li>Новое задание в курсе "Git и GitHub"</li>
              <li>Изменение в расписании</li>
            </ul>
          </div>
          <div className="card">
            <h3>Активные курсы</h3>
            <p>3 активных курса</p>
          </div>
        </div>
      </div>
    </div>

    <style jsx>{`
      .menu-main {
        font-weight: bold;
        cursor: default;
        color: #333;
        padding: 8px;
      }
      .overview-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
      }
      .card {
        background: #f5f5f5;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      }
    `}</style>
  </div>
);

}
