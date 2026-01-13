const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Multer setup
const upload = multer({ dest: "uploads/" });

// Parse CSV file into array
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
}

// Health check (optional but recommended)
app.get("/", (req, res) => {
  res.send("Backend running");
});

// Reconciliation endpoint
app.post(
  "/reconcile",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  async (req, res) => {
    try {
      if (!req.files?.file1 || !req.files?.file2) {
        return res.status(400).json({ error: "Both files are required" });
      }

      const file1Path = req.files.file1[0].path;
      const file2Path = req.files.file2[0].path;

      const data1 = await parseCSV(file1Path);
      const data2 = await parseCSV(file2Path);

      // Cleanup uploaded files
      fs.unlinkSync(file1Path);
      fs.unlinkSync(file2Path);

      const map2 = new Map(data2.map((d) => [d.invoice_id, Number(d.amount)]));

      const matches = [];
      const mismatches = [];
      const missingInSecond = [];

      for (const item of data1) {
        const amount1 = Number(item.amount);

        if (map2.has(item.invoice_id)) {
          const amount2 = map2.get(item.invoice_id);

          if (amount1 === amount2) {
            matches.push({
              invoice_id: item.invoice_id,
              amount: amount1,
            });
          } else {
            mismatches.push({
              invoice_id: item.invoice_id,
              reason: "Amount mismatch",
              purchase_amount: amount1,
              sales_amount: amount2,
            });
          }

          map2.delete(item.invoice_id);
        } else {
          missingInSecond.push({
            invoice_id: item.invoice_id,
            amount: amount1,
          });
        }
      }

      const missingInFirst = Array.from(map2.entries()).map(
        ([invoice_id, amount]) => ({
          invoice_id,
          amount,
        })
      );

      res.json({
        matches,
        mismatches,
        missingInFirst,
        missingInSecond,
      });
    } catch (error) {
      console.error("Reconciliation error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// REQUIRED FOR RENDER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
