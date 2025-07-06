import { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths,
  subMonths 
} from 'date-fns';

const CalendarView = ({ appointments, onDaySelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  
  const startDay = monthStart.getDay();
  const daysBefore = Array.from({ length: startDay }).fill(null);


  const calendarDays = [...daysBefore, ...daysInMonth];

  const getAppointmentsForDay = (day) => {
    if (!day) return [];
    return appointments.filter(app => 
      isSameDay(new Date(app.appointmentDate), day)
    );
  };

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full">
      
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-gray-100 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        <h2 className="text-xl font-bold text-gray-800">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        
        <button 
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-gray-100 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div 
            key={day} 
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* calender grid  */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          const dayAppointments = getAppointmentsForDay(day);
          const isCurrentMonth = day && isSameMonth(day, currentDate);
          const isToday = day && isSameDay(day, new Date());
          
          return (
            <div
              key={index}
              onClick={() => day && onDaySelect(day)}
              className={`
                min-h-20 p-1 border rounded
                ${!day ? 'bg-transparent border-transparent' : ''}
                ${day ? 'cursor-pointer' : ''}
                ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
                ${isToday ? 'border-blue-500 border-2' : 'border-gray-200'}
                ${dayAppointments.length > 0 ? 'bg-blue-50' : ''}
                transition-colors duration-150
              `}
            >
              {day && (
                <div className="flex flex-col h-full">
                
                  <span className={`
                    text-sm font-medium self-end
                    ${isToday ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}
                    ${!isToday && isCurrentMonth ? 'text-gray-800' : ''}
                  `}>
                    {format(day, 'd')}
                  </span>

                
                  <div className="flex-grow overflow-y-auto mt-1 space-y-1">
                    {dayAppointments.slice(0, 2).map(app => (
                      <div 
                        key={app.id}
                        className="text-xs p-1 rounded truncate bg-blue-100 text-blue-800"
                      >
                        {app.title}
                      </div>
                    ))}
                    {dayAppointments.length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{dayAppointments.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;