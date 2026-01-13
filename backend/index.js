const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

function parseCSV(filePath) {
  return new Promise((resolve) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results));
  });
}

app.post(
  "/reconcile",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  async (req, res) => {
    const file1 = req.files.file1[0].path;
    const file2 = req.files.file2[0].path;

    const data1 = await parseCSV(file1);
    const data2 = await parseCSV(file2);

    const map2 = new Map(data2.map((d) => [d.invoice_id, d]));

    const matches = [];
    const mismatches = [];
    const missingInSecond = [];

    for (let item of data1) {
      if (map2.has(item.invoice_id)) {
        const other = map2.get(item.invoice_id);
        if (item.amount === other.amount) {
          matches.push(item);
        } else {
          mismatches.push({
            invoice_id: item.invoice_id,
            reason: "Amount mismatch",
            file1: item.amount,
            file2: other.amount,
          });
        }
        map2.delete(item.invoice_id);
      } else {
        missingInSecond.push(item);
      }
    }

    const missingInFirst = Array.from(map2.values());

    res.json({
      matches,
      mismatches,
      missingInFirst,
      missingInSecond,
    });
  }
);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
