import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';

const CalendarView = ({ appointments, onDaySelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDay = monthStart.getDay();
  const daysBefore = Array.from({ length: startDay }).fill(null);
  const calendarDays = [...daysBefore, ...daysInMonth];

  const getAppointmentsForDay = (day) => {
    if (!day) return [];
    return appointments.filter((app) =>
      isSameDay(new Date(app.appointmentDate), day)
    );
  };

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const handleSelectDay = (day) => {
    if (!day) return;
    setSelectedDate(day);
    onDaySelect(day);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-gray-200 text-white"
        >
          ←
        </button>

        <h2 className="text-xl font-bold text-gray-800">
          {format(currentDate, 'MMMM yyyy')}
        </h2>

        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-gray-200 text-white"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          const dayAppointments = getAppointmentsForDay(day);
          const isCurrentMonth = day && isSameMonth(day, currentDate);
          const isToday = day && isSameDay(day, new Date());
          const isSelected = day && selectedDate && isSameDay(day, selectedDate);

          return (
            <div
              key={index}
              onClick={() => handleSelectDay(day)}
              className={`
                min-h-20 p-1 border rounded transition duration-200
                ${!day ? 'bg-transparent border-transparent' : 'cursor-pointer'}
                ${isSelected ? 'bg-blue-500 text-white' :
                  isToday ? 'border-blue-500 border-2' :
                  isCurrentMonth ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 text-gray-400 hover:bg-gray-200'}
                ${dayAppointments.length > 0 && !isSelected ? 'bg-blue-50' : ''}
              `}
            >
              {day && (
                <div className="flex flex-col h-full">
                  <span className={`
                    text-sm font-medium self-end 
                    ${isToday && !isSelected ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}
                    ${isSelected ? 'font-bold' : ''}
                    ${!isToday && !isSelected && isCurrentMonth ? 'text-gray-800' : ''}
                  `}>
                    {format(day, 'd')}
                  </span>

                  <div className="flex-grow overflow-y-auto mt-1 space-y-1">
                    {dayAppointments.slice(0, 2).map((app) => (
                      <div
                        key={app.id}
                        className={`text-xs p-1 rounded truncate 
                          ${isSelected ? 'bg-white text-blue-700' : 'bg-blue-100 text-blue-800'}
                        `}
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
