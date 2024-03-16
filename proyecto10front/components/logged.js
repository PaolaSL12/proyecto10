export const getlogged = async () => {
    const logged = JSON.parse(localStorage.getItem("user"))

    const res = await fetch(`http://localhost:3000/api/attendees/name/${logged.name}`);
    const response = await res.json();
    
    const userAteendee = response[0]

    return userAteendee
}
