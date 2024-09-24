const apiUrl = 'http://localhost:5000/api';

async function fetchEvents() {
    const response = await fetch(`${apiUrl}/events`);
    const events = await response.json();
    const eventsList = document.getElementById('events-list');

    events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('event-card');
        eventItem.innerHTML = `
            <h2>${event.title}</h2>
            <p>${event.description}</p>
            <a href="register.html?eventId=${event._id}">Register</a>
            <a href="participants.html?eventId=${event._id}">View</a>
        `;
        eventsList.appendChild(eventItem);
    });
}

async function registerEvent(eventId) {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const source = document.querySelector('input[name="source"]:checked').value;

    const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, dateOfBirth, source, eventId }),
    });

    const result = await response.json();
    alert('Registration successful!');
}

async function fetchParticipants(eventId) {
    const response = await fetch(`${apiUrl}/registrations/${eventId}`);
    const participants = await response.json();
    const participantsList = document.getElementById('participants-list');

    participants.forEach(participant => {
        const participantItem = document.createElement('div');
        participantItem.classList.add('participant-card');
        participantItem.innerHTML = `
            <p>${participant.fullName}</p>
            <p>${participant.email}</p>
        `;
        participantsList.appendChild(participantItem);
    });
}

if (document.getElementById('events-list')) {
    fetchEvents();
}

if (document.getElementById('registration-form')) {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('eventId');
    document.getElementById('eventId').value = eventId;

    document.getElementById('registration-form').addEventListener('submit', function(e) {
        e.preventDefault();
        registerEvent(eventId);
    });
}

if (document.getElementById('participants-list')) {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('eventId');
    fetchParticipants(eventId);
}
