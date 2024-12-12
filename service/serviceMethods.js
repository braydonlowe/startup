export async function getCalendar(selectedDate) {
    const response = await fetch(`/api/calendar/availability?month=${selectedDate.month + 1}&year=${selectedDate.year}`);
    const data = await response.json();
    return data;
}


export async function getAuthToken() {
    const token = sessionStorage.getItem('authToken');
    console.log('FROM SERVMETH');
    console.log(token);
    if (!token) {
        return null;
    }
    return token;
}

export async function getEmail() {
    const email = sessionStorage.getItem('userName');
    if (!email) {
        return null;
    }
    return email;
}


export async function postCalendar(who, year, month, dayString, updatedAvailibility) {
    const response = await fetch('/api/calendar/availability', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            who,
            year,
            month,
            day: dayString,
            isAvailable: updatedAvailibility,
        }),
    });
}