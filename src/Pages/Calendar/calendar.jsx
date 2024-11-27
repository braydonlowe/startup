import React, { useState } from "react";
import { Header } from "../Components/Header/Header"
import { Footer } from "../Components/Footer/Footer";


const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    });

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

    const renderDays = () => {
        const days = [];
        const totalDays = daysInMonth(selectedDate.month, selectedDate.year);

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div className="empty" key={`empty-${i}`}></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            days.push(
                <div className="day" key={day}>
                    {day}
                    <span className="availability">Available</span>
                </div>
            );
        }

        return days;
    };

    return (
        <div class="wrapper">
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