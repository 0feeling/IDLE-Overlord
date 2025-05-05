function GeneratorPanel({ id, data, inspiration, buyGenerator }) {
  const cost = Math.floor(data.baseCost * Math.pow(1.15, data.count));

  return (
    <div className="bg-gray-800 p-3 rounded mb-2 flex justify-between items-center">
      <div>
        <div className="font-bold">{data.name}</div>
        <div className="text-sm text-gray-400">
          {data.count} instance(s) – {data.rate}💡/s
        </div>
      </div>
      <button
        onClick={() => buyGenerator(id)}
        disabled={inspiration < cost}
        className={`px-3 py-1 rounded ${
          inspiration >= cost
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-600 cursor-not-allowed"
        }`}
      >
        Acheter ({cost}💡)
      </button>
    </div>
  );
}

export default GeneratorPanel;
