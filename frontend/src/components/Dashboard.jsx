import ResultTable from "./ResultTable.jsx";

export default function Dashboard({ data }) {
  return (
    <div className="mt-6 space-y-6">
      {/* SUMMARY */}
      <div className="grid grid-cols-4 gap-4">
        <SummaryCard
          title="Matches"
          value={data.matches.length}
          color="green"
        />
        <SummaryCard
          title="Mismatches"
          value={data.mismatches.length}
          color="red"
        />
        <SummaryCard
          title="Missing in Sales"
          value={data.missingInSecond.length}
          color="orange"
        />
        <SummaryCard
          title="Missing in Purchase"
          value={data.missingInFirst.length}
          color="purple"
        />
      </div>

      {/* TABLE */}
      <ResultTable data={data} />
    </div>
  );
}

function SummaryCard({ title, value, color }) {
  return (
    <div className={`p-4 rounded shadow bg-${color}-100`}>
      <p className="font-semibold">{title}</p>
      <p className="text-2xl">{value}</p>
    </div>
  );
}
