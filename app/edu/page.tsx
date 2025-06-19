"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import "../edu/styl/style.css";

export default function Home() {
  const router = useRouter();
  const [selectedQuarter, setSelectedQuarter] = useState(null);

  const plan = {
    "Месяц 1-3": "Изучаем основы программирования на C++, переменные, циклы, условия, функции.",
    "Месяц 4-6": "Переходим к веб-разработке: HTML, CSS, JavaScript. Создаём простые сайты.",
    "Месяц 7-9": "Знакомимся с фреймворками: React, Node.js. Учимся строить SPA приложения.",
    "Месяц 10-12": "Углубляемся в искусственный интеллект и машинное обучение на Python, основы нейросетей."
  };

  return (
    <div>
      <Head>
        <title>План Изучения Языков Программирования</title>
        <meta
          name="description"
          content="Годовой план изучения языков программирования с разбивкой по кварталам."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Годовой План Изучения Программирования</h1>

        <p style={{ textAlign: "center", fontSize: "18px", marginBottom: "30px" }}>
          В первые месяцы изучаем C++, затем переходим к вебу и завершаем искусственным интеллектом.
        </p>

        <div className="button-grid">
          {Object.keys(plan).map((quarter) => (
            <button
              key={quarter}
              className={`quarter-button ${selectedQuarter === quarter ? "active" : ""}`}
              onClick={() => setSelectedQuarter(quarter)}
            >
              {quarter}
            </button>
          ))}
        </div>

        {selectedQuarter && (
          <div className="quarter-description">
            <h2>{selectedQuarter}</h2>
            <p>{plan[selectedQuarter]}</p>
          </div>
        )}

        <button onClick={() => router.push("/main")} className="navigate-button">
          Перейти на Главную страницу
        </button>
      </main>

      <footer></footer>
    </div>
  );
}

