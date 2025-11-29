import { useState, useEffect } from "react";
import {
  TrendingUp,
  Calendar,
  Target,
  DollarSign,
  ChevronDown,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const GivingsTracker = () => {
  const [data, setData] = useState<
    Array<{ weeks: string; amount: number; change: number; cumm: number }>
  >([]);
  const [loading, setLoading] = useState(true);

  // currentWeek tracks the actual date-based week (max limit)
  const [currentWeek, setCurrentWeek] = useState(1);
  // selectedWeek tracks what the user wants to see
  const [selectedWeek, setSelectedWeek] = useState(1);

  const TARGET = 200000000;

  const givingsTracker = async () => {
    try {
      const res = await fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vRB6nQTxvwfnkbVR3vvGC-5_Efwzolru-Lt_7cCfj-VAzwHn2s7r8PfVX9bz2OXeht92H56daBLIr7h/pub?gid=0&single=true&output=csv"
      );
      const csvText = await res.text();
      const rows = csvText.trim().split("\n");
      const parsedData = rows
        .slice(1)
        .map((row) => {
          const [weeks, amount, change, cumm] = row.split(",");
          return {
            weeks: weeks,
            amount: parseFloat(amount),
            change: parseFloat(change),
            cumm: parseFloat(cumm),
          };
        })
        .filter((item) => item.weeks && !isNaN(item.amount)); // Filter out empty or incomplete rows
      return parsedData;
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    }
  };

  const getCurrentWeek = () => {
    const startDate = new Date("2025-11-02T00:00:00+01:00");
    const now = new Date();
    const diffTime = now.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const week = Math.floor(diffDays / 7) + 1;
    return week;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await givingsTracker();
      setData(result);

      const calculatedWeek = getCurrentWeek();
      setCurrentWeek(calculatedWeek);

      // Default the display to the current date-based week
      // Ensure we don't select a week that doesn't exist in data yet
      const maxDataWeek = result.length;
      const initialViewWeek =
        calculatedWeek > maxDataWeek ? maxDataWeek : calculatedWeek;

      setSelectedWeek(initialViewWeek > 0 ? initialViewWeek : 1);

      setLoading(false);
    };
    fetchData();
  }, []);

  const formatNaira = (amount: number | bigint) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Find data based on user selection
  const currentWeekData = data.find((d) => d.weeks === `Week ${selectedWeek}`);

  // Use selected week data, fall back to 0 if data missing
  const totalGiven = currentWeekData ? currentWeekData.cumm : 0;
  // If viewing previous weeks, the 'remaining' should be based on that week's cumulative
  const remaining = currentWeekData ? TARGET - currentWeekData.cumm : TARGET;
  const progress = (totalGiven / TARGET) * 100;

  const pieChartData = [
    { name: "Total Given", value: totalGiven, color: "#10b981" },
    { name: "Remaining", value: remaining, color: "#aa80ff" },
  ];

  const handleWeekChange = (e: { target: { value: unknown } }) => {
    setSelectedWeek(Number(e.target.value));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading givings data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <div className="text-center mb-8">
            <img
              src="https://hiccproject200.vercel.app/faviconizm.png"
              width={85}
              height={"auto"}
              className="mx-auto m-6"
              alt="Project Logo"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Project 200 Tracker
            </h1>

            {/* Week Selector Dropdown */}
            <div className="items-center justify-center gap-2 text-indigo-600 relative inline-flex mx-auto mt-4 bg-indigo-50 px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors">
              <Calendar className="w-5 h-5" />
              <div className="relative">
                <select
                  value={selectedWeek}
                  onChange={handleWeekChange}
                  className="appearance-none bg-transparent text-lg font-semibold text-indigo-700 pr-6 focus:outline-none cursor-pointer"
                >
                  {data
                    .filter((_, index) => index + 1 <= currentWeek) // Only show weeks up to the current calendar week
                    .map((week, index) => {
                      const weekNum = index + 1;
                      return (
                        <option key={index} value={weekNum}>
                          {week.weeks}
                        </option>
                      );
                    })}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            {selectedWeek !== currentWeek && (
              <p className="text-xs text-gray-500 mt-2">
                Viewing past data (Current: Week {currentWeek})
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-green-600" />
                <h3 className="text-sm font-semibold text-gray-600 uppercase">
                  Total Given (Week {selectedWeek})
                </h3>
              </div>
              <p className="text-3xl font-bold text-green-700">
                {formatNaira(totalGiven)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-6 h-6 text-orange-600" />
                <h3 className="text-sm font-semibold text-gray-600 uppercase">
                  Remaining
                </h3>
              </div>
              <p className="text-3xl font-bold text-orange-700">
                {formatNaira(remaining)}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-700">
                Progress to Target
              </h3>
              <span className="text-2xl font-bold text-indigo-600">
                {progress.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-8 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                {progress > 10 && <TrendingUp className="w-5 h-5 text-white" />}
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{formatNaira(totalGiven)}</span>
              <span className="font-semibold">{formatNaira(TARGET)}</span>
            </div>
          </div>

          <div className="mb-8 bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
              Given vs Remaining
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  startAngle={180}
                  endAngle={-180}
                  label={({ name, percent }) =>
                    `${name}: ${((percent ?? 0) * 100).toFixed(1)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatNaira(Number(value))} />
                <Legend
                  align="center"
                  verticalAlign="bottom"
                  layout="vertical"
                  formatter={(value, entry) => {
                    const payloadValue = entry?.payload?.value ?? 0;
                    return `${value}: ${formatNaira(payloadValue)}`;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Weekly Breakdown
            </h3>
            <div className="space-y-3">
              {data.map((week, idx) => {
                // Highlight the SELECTED week, not just the current date week
                const isSelectedWeek = week.weeks === `Week ${selectedWeek}`;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg transition-all duration-200 ${
                      isSelectedWeek
                        ? "bg-indigo-100 border-2 border-indigo-400 transform scale-[1.02]"
                        : "bg-white border border-gray-200 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className={`font-semibold ${
                          isSelectedWeek ? "text-indigo-700" : "text-gray-700"
                        }`}
                      >
                        {week.weeks} {isSelectedWeek && "(Selected)"}
                      </span>
                      <span
                        className={`font-bold ${
                          isSelectedWeek ? "text-indigo-600" : "text-gray-600"
                        }`}
                      >
                        {formatNaira(week.amount)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center text-gray-600 text-sm">
          <p>
            Target: {formatNaira(TARGET)} • Viewing Week {selectedWeek} of{" "}
            {data.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GivingsTracker;
