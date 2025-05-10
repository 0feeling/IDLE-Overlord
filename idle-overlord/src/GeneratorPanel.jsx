function GeneratorPanel({ id, data, inspiration, buyGenerator }) {
  const cost = Math.floor(data.baseCost * Math.pow(1.15, data.count));
  const production = (data.rate * data.count).toFixed(1);
  const nextProduction = (data.rate * (data.count + 1)).toFixed(1);

  return (
    <div className="bg-gray-800 p-3 rounded mb-2 flex justify-between items-center">
      <div>
        <div className="font-bold">{data.name}</div>
        <div className="text-sm text-gray-400">
          {data.count} instance(s) • {production} 💡/s
        </div>
        <div className="text-xs text-gray-500">
          Prochain: +{data.rate} 💡/s (Total: {nextProduction})
        </div>
      </div>
      <button
        aria-disabled={inspiration < cost}
        onClick={() => inspiration >= cost && buyGenerator(id)}
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
