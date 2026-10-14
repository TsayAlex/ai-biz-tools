import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
const src = await readFile(new URL("../lib/workflowValue.js", import.meta.url), "utf8");
const { calculateWorkflowValue } = await import("data:text/javascript;base64," + Buffer.from(src).toString("base64"));

test("15 replies per week save 2.5 hours at a conservative 50% time reduction", () => {
  const r = calculateWorkflowValue({ minutesPerTask:20, tasksPerWeek:15, savingPercent:50, hourlyValue:20, monthlyCost:15 });
  assert.equal(r.weeklyHours, 2.5);
  assert.ok(Math.abs(r.monthlyHours - 10.833333333333334) < 0.0001);
  assert.ok(Math.abs(r.netValue - 201.6666666667) < 0.01);
});
test("no reduction produces no value, and cost remains", () => {
  const r = calculateWorkflowValue({ minutesPerTask:20, tasksPerWeek:15, savingPercent:0, hourlyValue:20, monthlyCost:15 });
  assert.equal(r.grossValue, 0);
  assert.equal(r.netValue, -15);
});
test("zero tasks cannot create fictitious time savings", () => {
  const r = calculateWorkflowValue({ minutesPerTask:20, tasksPerWeek:0, savingPercent:100, hourlyValue:50, monthlyCost:0 });
  assert.equal(r.weeklyHours, 0);
  assert.equal(r.netValue, 0);
});
test("invalid, negative and extreme inputs are bounded", () => {
  const r = calculateWorkflowValue({ minutesPerTask:-100, tasksPerWeek:Infinity, savingPercent:700, hourlyValue:NaN, monthlyCost:-3 });
  assert.deepEqual([r.weeklyHours, r.grossValue, r.monthlyCost], [0,0,0]);
});
test("all zero inputs produce finite results", () => {
  const r = calculateWorkflowValue({});
  assert.ok(Object.values(r).every(x => Number.isFinite(x) || typeof x === "boolean"));
});
