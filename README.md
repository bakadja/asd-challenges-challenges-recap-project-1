# 📚 IT-Book Library

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)
[![Milligram](https://img.shields.io/badge/Milligram-9b4dca?style=for-the-badge&logo=css3&logoColor=white)](https://milligram.io/)

A modern, fast, and lightweight IT-Book Library application built as a recap project. This application allows users to browse a collection of IT books, search by title, filter by publisher, and manage a personal favorites list.

---

## ✨ Features

- **🔍 Live Search**: Quickly find books by their title as you type.
- **📂 Publisher Filtering**: Narrow down your search by selecting specific publishers.
- **❤️ Favorites System**: Save your favorite books to your local storage for easy access later.
- **📖 Detailed View**: In-depth information for every book, including abstracts, authors, and page counts.
- **⚡ Fast Loading**: Built with Bun for ultra-fast performance and HMR.
- **🎨 Minimalist Design**: Clean UI powered by Milligram CSS and Google Fonts.

---

## 🛠️ Tech Stack

- **Runtime & Bundler**: [Bun](https://bun.sh/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Frontend**: Vanilla HTML5 & CSS3
- **Styling**: [Milligram](https://milligram.io/) (Minimalist CSS Framework)
- **Persistence**: Browser `localStorage`

---

## 🚀 Getting Started

### Prerequisites

1.  **Bun**: Ensure you have [Bun](https://bun.sh/) installed on your machine.
2.  **Local API**: This project expects a book API running at `http://localhost:4730/`.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd asd-challenges-challenges-recap-project-1
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

### Running the Application

To start the development server:

```bash
bun src/**/*.html
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

You have a three routes:
- / → src/index.html
- /detail → src/detail.html
- /favorite → src/favorite.html

---

## 📂 Project Structure

```text
├── src/
│   ├── books.ts        # Core logic, data fetching & templates
│   ├── frontend.ts     # Main page interaction logic
│   ├── index.html      # Landing page
│   ├── detail.html     # Book detail view
│   ├── favorite.html   # Favorites management page
│   ├── style.css       # Custom application styles
│   └── images/         # Local assets
├── package.json        # Project dependencies
└── tsconfig.json       # TypeScript configuration
```

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---

*Developed as part of the Neue Fische Bootcamp curriculum.*
