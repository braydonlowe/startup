import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header/Header"
import { Footer } from "../Components/Footer/Footer";
import "./calendar.css"


const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    });

    const [availabilityData, setAvailabilityData] = useState([]);
    const[selectedDays, setSelectedDays] = useState({});

    useEffect(() => {
        //Can put into different file here.
        const fetchAvailibility = async () => {
            const response = await fetch(`/api/calendar/availability?month=${selectedDate.month + 1}&year=${selectedDate.year}`);
            const data = await response.json();
            setAvailabilityData(data);

            const initialAvailability = data.days.reduce((acc, day) => {
                acc[day.date] = day.isAvailable;
                return acc;
            }, {});
            setSelectedDays(initialAvailability);
        };
        fetchAvailibility();
    }, [selectedDate]); 

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = new Date(selectedDate.year, selectedDate.month, 1).getDay();

    const handleMonthChange = (event) => {
        setSelectedDate({ ...selectedDate, month: parseInt(event.target.value) });
    };

    const handleYearChange = (event) => {
        setSelectedDate({ ...selectedDate, year: parseInt(event.target.value) });
    };

    const handleDayClick = (day) => {
        setSelectedDays((prev) => ({
            ...prev,
            [day]: !prev[day],
        }));
    };

    const renderDays = () => {
        const days = [];
        const totalDays = daysInMonth(selectedDate.month, selectedDate.year);

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div className="empty" key={`empty-${i}`}></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            const dayString = `${selectedDate.year}-${selectedDate.month + 1}-${day}`
            const isAvailable = selectedDays[dayString] !== undefined ? selectedDays[dayString] : true;
            days.push(
                <div className={`day ${isAvailable ? "available" : "unavailable"}`}
                    key={day}
                    onClick={() => handleDayClick(dayString)}
                >
                    {day}
                    <span className="availability">{isAvailable ? "Available" : "Busy"}</span>
                </div>
            );
        }

        return days;
    };

    return (
        <div className="wrapper">
            <Header />
            <div className="calendar-container">
                <div className="controls">
                    <select value={selectedDate.month} onChange={handleMonthChange}>
                        {Array.from({ length: 12 }, (_, index) => (
                            <option key={index} value={index}>
                                {new Date(0, index).toLocaleString('default', { month: 'long' })}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={selectedDate.year}
                        onChange={handleYearChange}
                        min="2000"
                        max="2100"
                    />
                </div>
                <div className="calendar-grid">{renderDays()}</div>
            </div>
            <Footer />


        </div>
        
    );
}


export default Calendar