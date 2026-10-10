# Submission Security Review / Проверка безопасности формы

Date / Дата: 2026-10-10

## Changes / Изменения
- Limit declared request size to 16 KiB before multipart parsing. / Ограничение заявленного размера запроса 16 КиБ до обработки формы.
- Bound individual fields before invoking Resend. / Ограничение длины полей до вызова Resend.
- Reject website URLs with embedded credentials. / Запрет URL со встроенными учётными данными.
- Keep honeypot and existing successful submission behavior. / Сохранена антиспам-ловушка и прежняя логика успешной отправки.

## Remaining risks / Оставшиеся риски
- Content-Length may be absent or falsified: enforce request-body limits at hosting edge too. / Заголовок Content-Length может отсутствовать или быть неверным: нужен лимит на стороне хостинга.
- No distributed rate limiter yet: implement at platform/edge before production rollout. / Нет распределённого ограничения частоты: добавить на платформе до релиза.
- Honeypot alone does not stop automated submissions. / Одной антиспам-ловушки недостаточно против ботов.
- Audit dependencies and run functional tests before merge. / Проверить зависимости и запустить функциональные тесты до объединения.
- Avoid storing API keys in code; keep RESEND_API_KEY and SUBMISSIONS_TO as hosting secrets. / Не хранить ключи в коде; использовать секреты хостинга.
- Never expose submission destination address or email provider errors to visitors. / Не раскрывать посетителям адрес получателя и ошибки почтового сервиса.

Status: REVIEW REQUIRED / Требуется проверка. Not deployed / Не опубликовано.
