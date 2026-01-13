# Smart Reconciliation Visualizer

A web-based application that compares and reconciles two financial datasets (Purchase Register vs Sales Register) and visually highlights matched, mismatched, and missing records.

---

## Features

- Upload two CSV files (Purchase & Sales)
- Reconcile records using `invoice_id`
- Identify:
  - Matched records
  - Amount mismatches
  - Missing records in either dataset
- Filterable and searchable reconciliation table
- Responsive UI using Tailwind CSS

---

## Sample Datasets

### Purchase Data (`purchase_data.csv`)

| invoice_id | amount |
| ---------- | ------ |
| INV011     | 5000   |
| INV012     | 2200   |
| INV013     | 1800   |
| INV014     | 3500   |
| INV015     | 4100   |

### Sales Data (`sales_data.csv`)

| invoice_id | amount |
| ---------- | ------ |
| INV006     | 1200   |
| INV007     | 2600   |
| INV010     | 3000   |
| INV009     | 4000   |

> These are small sample files for testing reconciliation logic (missing records, no matches in this case).

---

## Reconciliation Logic

1. Parse both CSV files
2. Index records using `invoice_id`
3. For each invoice:
   - Exists in both datasets:
     - Same amount → MATCHED
     - Different amount → MISMATCH
   - Exists in only one dataset → MISSING
4. Send consolidated results to frontend for visualization

---

## Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express
- CSV Parsing

### Deployment

- Render

---

## Project Structure

reconciliation-visualizer/
├── backend/
│ ├── index.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Upload.jsx
│ │ │ ├── Dashboard.jsx
│ │ │ └── ResultTable.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ └── package.json
│
├── README.md
└── .gitignore

---

## Local Setup & Run (Step by Step)

### Clone Repository

git clone https:[//github.com/YOUR_USERNAME/reconciliation-visualizer.git](https://github.com/HarxitG/Reconciliation-Visualizer.git)
cd reconciliation-visualizer

---

### Backend Setup

cd backend
```
npm install
node index.js
```
Backend runs on:
```
http://localhost:5000
```
---

### Frontend Setup
```
cd ../frontend
npm install
npm run dev
```
Frontend runs on:
```
http://localhost:5173
```
---

## Deployment (Render)

### Backend (Web Service)

Root Directory: backend
Build Command:
```
npm install
```
Start Command
```
node index.js
```

---

### Frontend (Static Site)

Root Directory: frontend
Build Command:
```
npm install && npm run build
```
Publish Directory:
```
dist
```

Environment Variable:
VITE_API_URL=[https://<backend-name>.onrender.com](https://reconciliation-visualizer.onrender.com)

Live: https://reconciliation-visualizer-1.onrender.com
---

## Testing

Tested using multiple CSV datasets covering:

- Full matches
- Amount mismatches
- Missing records on either side

---

## Assumptions

- `invoice_id` is unique
- CSV schema is consistent
- Exact amount comparison

---
