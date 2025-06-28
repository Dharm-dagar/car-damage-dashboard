const ResultCard = ({ title, value }) => (
  <div className="p-4 rounded-xl shadow-md bg-white text-center">
    <h2 className="text-lg font-bold">{title}</h2>
    <p className="text-xl mt-2 text-indigo-600">{value}</p>
  </div>
);

export default ResultCard;
