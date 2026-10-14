// Scenario calculator only. These are hypotheses, not measured savings or revenue.
const bounded = (input, lower, upper) => {
  const n = Number(input);
  return Number.isFinite(n) ? Math.min(upper, Math.max(lower, n)) : lower;
};

export function calculateWorkflowValue(values = {}) {
  const minutesPerTask = bounded(values.minutesPerTask, 0, 600);
  const tasksPerWeek = bounded(values.tasksPerWeek, 0, 500);
  const savingRate = bounded(values.savingPercent, 0, 100) / 100;
  const hourlyValue = bounded(values.hourlyValue, 0, 250);
  const monthlyCost = bounded(values.monthlyCost, 0, 5000);

  const weeklyHours = (minutesPerTask * tasksPerWeek * savingRate) / 60;
  const monthlyHours = weeklyHours * 52 / 12;
  const grossValue = monthlyHours * hourlyValue;
  const netValue = grossValue - monthlyCost;

  return { weeklyHours, monthlyHours, grossValue, monthlyCost, netValue,
    breakEven: grossValue >= monthlyCost, savingRate };
}
