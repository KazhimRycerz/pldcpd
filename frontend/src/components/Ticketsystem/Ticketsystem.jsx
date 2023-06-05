import './Ticketsystem.scss';
import React, { useState } from 'react';

const TicketSystem = () => {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState('');

  const handleInputChange = (e) => {
    setNewTicket(e.target.value);
  };

  const handleAddTicket = () => {
    if (newTicket.trim() !== '') {
      setTickets([...tickets, newTicket]);
      setNewTicket('');
    }
  };

  const handleDeleteTicket = (index) => {
    const updatedTickets = tickets.filter((_, i) => i !== index);
    setTickets(updatedTickets);
  };

  return (
    <div>
      <h2>Ticket System</h2>
      <input type="text" value={newTicket} onChange={handleInputChange} />
      <button onClick={handleAddTicket}>Add Ticket</button>
      <ul>
        {tickets.map((ticket, index) => (
          <li key={index}>
            {ticket}
            <button onClick={() => handleDeleteTicket(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketSystem;
