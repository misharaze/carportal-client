import React, { useState } from "react";
import "./CarhistoryCheck.scss";

export default function CarHistoryCheck({ vin }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkHistory = async () => {
    setLoading(true);
    setResult(null);
    try {
      // Здесь будет вызов реального API проверки истории авто по VIN
      // Пример с mock-данными:
      await new Promise(res => setTimeout(res, 1000)); // эмуляция запроса
      setResult({
        mileageCheck: "Пробег проверен: 74 000 км",
        accidents: "ДТП не обнаружено",
        serviceHistory: "Сервисная история доступна"
      });
    } catch (err) {
      setResult({ error: "Ошибка при проверке истории" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="car-history-check">
      <button onClick={checkHistory} disabled={loading}>
        {loading ? "Проверка..." : "Проверить историю авто"}
      </button>

      {result && (
        <div className="car-history-check__result">
          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <>
              <p>{result.mileageCheck}</p>
              <p>{result.accidents}</p>
              <p>{result.serviceHistory}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
