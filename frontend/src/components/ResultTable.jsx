export default function ResultTable({ data }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Reconciliation Results</h2>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Invoice ID</th>
            <th className="border p-2">Purchase Amount</th>
            <th className="border p-2">Sales Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Reason</th>
          </tr>
        </thead>

        <tbody>
          {/* MATCHED RECORDS */}
          {data.matches.map((item) => (
            <tr key={`match-${item.invoice_id}`}>
              <td className="border p-2">{item.invoice_id}</td>
              <td className="border p-2">{item.amount}</td>
              <td className="border p-2">{item.amount}</td>
              <td className="border p-2 text-green-600 font-medium">Matched</td>
              <td className="border p-2">—</td>
            </tr>
          ))}

          {/* MISMATCHED RECORDS */}
          {data.mismatches.map((item) => (
            <tr key={`mismatch-${item.invoice_id}`}>
              <td className="border p-2">{item.invoice_id}</td>
              <td className="border p-2">{item.file1}</td>
              <td className="border p-2">{item.file2}</td>
              <td className="border p-2 text-red-600 font-medium">
                Mismatched
              </td>
              <td className="border p-2">{item.reason}</td>
            </tr>
          ))}

          {/* MISSING IN SALES */}
          {data.missingInSecond.map((item) => (
            <tr key={`missing-sales-${item.invoice_id}`}>
              <td className="border p-2">{item.invoice_id}</td>
              <td className="border p-2">{item.amount}</td>
              <td className="border p-2">—</td>
              <td className="border p-2 text-orange-600 font-medium">
                Missing in Sales
              </td>
              <td className="border p-2">
                Invoice not found in sales register
              </td>
            </tr>
          ))}

          {/* MISSING IN PURCHASE */}
          {data.missingInFirst.map((item) => (
            <tr key={`missing-purchase-${item.invoice_id}`}>
              <td className="border p-2">{item.invoice_id}</td>
              <td className="border p-2">—</td>
              <td className="border p-2">{item.amount}</td>
              <td className="border p-2 text-purple-600 font-medium">
                Missing in Purchase
              </td>
              <td className="border p-2">
                Invoice not found in purchase register
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
