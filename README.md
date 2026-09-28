# Shree Lotus English Boarding School Website

This ZIP contains a professional multi-page school website for Shree Lotus English Boarding School, Sallaghari-11, Amargadhi, Dadeldhura.

## Features
- Separate pages, not one long hidden page.
- Home page opens first.
- Sticky header and menu on every page.
- School logo, principal and chairperson images.
- Image slider and gallery with descriptions.
- Nepali/English switch-ready interface.
- Live AD date/time and BS 2083 date.
- Direct call buttons.
- Notice, events, academics, calendar, admission, routine, student status, parents' comments, achievements, online exam, contact, location and important links.
- Online MCQ practice exam with browser-side score.
- Student status lookup using symbol number, date of birth and name.
- Editable JSON files in separate content folders.
- Responsive mobile design.

## Easy customisation
Edit the JSON files inside `content/`:
- `content/site-data.json` = school, leaders, facilities, gallery and slider.
- `content/notices/notices.json` = notices.
- `content/events/events.json` = events.
- `content/academics/academics.json` = academics.
- `content/calendar/calendar.json` = calendar.
- `content/admission/admission.json` = admission.
- `content/routine/routine.json` = routine.
- `content/parents/comments.json` = parents' comments.
- `content/achievements/achievements.json` = achievements.
- `content/links/links.json` = important links.
- `content/exam/exam.json` = MCQ questions.
- `content/students/students.json` = authorised student records.
- `content/staff/staff.json` = staff list for later expansion.

Put replacement photos in `assets/images/`. Keep filenames the same or edit the image paths in `content/site-data.json`.

## Publishing
Upload the complete folder structure to a GitHub repository and enable GitHub Pages from the main branch and root folder.

## Local testing
The pages load JSON with JavaScript. Some browsers block this when opening HTML with `file://`. GitHub Pages or a local web server is recommended.

## Important privacy/security note
The student status feature is a front-end demonstration. Real student DOBs and records should not be placed in a public JSON file unless the school has approved that design. For a real student portal, use a secure backend/database and authentication.

The online exam is also a browser-side practice system. For official exams, use a secure backend so answers and results cannot be modified by the client.

## BS date
The included header uses a BS 2083 calendar table for the current BS year. The table can be extended in `js/app.js` for future years.
