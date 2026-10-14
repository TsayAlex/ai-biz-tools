"use client";
import { useState, useRef } from "react";
import { track } from "../lib/analytics";
import { calculateWorkflowValue } from "../lib/workflowValue";

const words = {
  en: {
    lang: "Language", intro: "Try a realistic example, then change the numbers for your own weekly routine.",
    minutes: "Minutes spent on one task", tasks: "How many times per week?",
    saving: "Time reduced with a tool (%)", value: "Approximate value of one working hour (€)",
    cost: "Estimated monthly software cost (€)", results: "Your scenario",
    weekly: "Hours potentially freed each week", monthly: "Hours potentially freed each month",
    gross: "Potential monthly value of time (€)", net: "Value after software cost (€)",
    warning: "Illustrative scenario, not guaranteed savings or actual earnings. Start with a small trial. Time saved is only valuable if you can use it well. Review AI outputs and protect customer information.",
    privacy: "This calculator runs in your browser. Your numbers are not submitted to our server.",
    action: "Find tools for this workflow →", try: "Example: drafting and replying to customer enquiries",
    sign: "A negative number means the scenario does not yet cover the estimated software cost."
  },
  ru: {
    lang: "Язык", intro: "Посмотри пример и измени числа под свою работу.",
    minutes: "Минут на одно повторяющееся дело", tasks: "Сколько раз в неделю?",
    saving: "Насколько сократится время (%)", value: "Приблизительная ценность часа работы (€)",
    cost: "Стоимость программы в месяц (€)", results: "Твой расчёт",
    weekly: "Возможная экономия часов за неделю", monthly: "Возможная экономия часов за месяц",
    gross: "Условная ценность времени в месяц (€)", net: "Разница после стоимости программы (€)",
    warning: "Это примерный расчёт, а не обещание экономии или заработка. Сначала протестируй один реальный процесс. Свободное время полезно, только если применить его с пользой. Проверяй результаты ИИ и защищай данные клиентов.",
    privacy: "Расчёт выполняется в браузере. Введённые цифры не отправляются на сервер.",
    action: "Подобрать инструменты →", try: "Пример: ответы на запросы клиентов",
    sign: "Минус означает, что предполагаемая экономия пока не покрывает стоимость программы."
  },
  ua: {
    lang: "Мова", intro: "Подивись приклад і зміни числа відповідно до своєї роботи.",
    minutes: "Хвилин на одну повторювану справу", tasks: "Скільки разів на тиждень?",
    saving: "На скільки скоротиться час (%)", value: "Орієнтовна цінність години роботи (€)",
    cost: "Вартість програми за місяць (€)", results: "Твій розрахунок",
    weekly: "Можлива економія годин за тиждень", monthly: "Можлива економія годин за місяць",
    gross: "Умовна цінність часу на місяць (€)", net: "Різниця після оплати програми (€)",
    warning: "Це приклад, а не гарантія економії чи заробітку. Спочатку перевір один реальний процес. Звільнений час корисний лише тоді, коли його використати. Перевіряй результати ШІ та захищай дані клієнтів.",
    privacy: "Розрахунок виконується у браузері. Ваші цифри не надсилаються на сервер.",
    action: "Підібрати інструменти →", try: "Приклад: відповіді на запити клієнтів",
    sign: "Від’ємне число означає, що сценарій поки не покриває вартість програми."
  }
};

const inputs = [
  ["minutesPerTask","minutes",1,600,1],
  ["tasksPerWeek","tasks",0,500,1],
  ["savingPercent","saving",0,100,5],
  ["hourlyValue","value",0,250,1],
  ["monthlyCost","cost",0,5000,1]
];

export default function WorkflowValueCalculator() {
  const [language, setLanguage] = useState("en");
  const engagementTracked = useRef(false);

  function changeValue(key, value) {
    // Consent-aware and once per mounted page. Never send the entered numbers.
    if (!engagementTracked.current && track("calculator_engaged", { source: "workflow_value_calculator" })) {
      engagementTracked.current = true;
    }
    setValues(prev => ({ ...prev, [key]: value }));
  }

  function goToFinder() {
    // An actual button click, not an assumed conversion or a page view.
    track("calculator_to_finder", { source: "workflow_value_calculator" });
  }
  const [values, setValues] = useState({ minutesPerTask: 20, tasksPerWeek: 15, savingPercent: 50, hourlyValue: 20, monthlyCost: 15 });
  const t = words[language];
  const result = calculateWorkflowValue(values);
  const locale = language === "ru" ? "ru-RU" : language === "ua" ? "uk-UA" : "en-IE";
  const number = n => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(n);
  const money = n => new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  return <section className="value-widget" aria-label="AI workflow savings scenario calculator">
    <div className="value-widget-head">
      <p>{t.intro}</p>
      <label>{t.lang}
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          <option value="en">English</option><option value="ru">Русский</option><option value="ua">Українська</option>
        </select>
      </label>
    </div>
    <p className="value-example">{t.try}</p>
    <div className="value-inputs">
      {inputs.map(([key, label, min, max, step]) => <label key={key}>
        <span>{t[label]}</span>
        <input type="number" inputMode="decimal" min={min} max={max} step={step}
          value={values[key]}
          onChange={e => changeValue(key, e.target.value)} />
      </label>)}
    </div>
    <h2>{t.results}</h2>
    <div className="value-results" aria-live="polite" aria-atomic="true">
      <div><span>{t.weekly}</span><strong>{number(result.weeklyHours)} h</strong></div>
      <div><span>{t.monthly}</span><strong>{number(result.monthlyHours)} h</strong></div>
      <div><span>{t.gross}</span><strong>{money(result.grossValue)}</strong></div>
      <div className="value-total"><span>{t.net}</span><strong>{money(result.netValue)}</strong></div>
    </div>
    {result.netValue < 0 && <p className="value-note">{t.sign}</p>}
    <p className="value-warning">{t.warning}</p>
    <p className="value-privacy">{t.privacy}</p>
    <a className="primary big" href="/#finder" onClick={goToFinder}>{t.action}</a>
  </section>;
}
