const KPICard = ({ title, value, icon, trend, color = 'blue' }) => {
  const bgColors = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    amber: 'bg-amber-100',
    red: 'bg-red-100'
  };
  
  const textColors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    amber: 'text-amber-600',
    red: 'text-red-600'
  };
  {/* kpi cards  */}

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-black">{title}</p>
          <p className="text-2xl font-semibold mt-1 text-black">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${bgColors[color]}`}>
          {icon}
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center">
          <span className={`${textColors[color]} flex items-center`}>
            {trend.direction === 'up' ? (
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
            {trend.value}
          </span>
          <span className="text-sm text-gray-500 ml-2">{trend.label}</span>
        </div>
      )}
    </div>
  );
};

export default KPICard;