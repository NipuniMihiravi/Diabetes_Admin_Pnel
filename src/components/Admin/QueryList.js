import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QueryList = () => {
    const [contacts, setContacts] = useState([]);
    const [editContact, setEditContact] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('/api/query');
            const sortedContacts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setContacts(sortedContacts);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
        if (confirmDelete) {
            try {
                await axios.delete(`/api/query/${id}`);
                setContacts(contacts.filter(contact => contact.id !== id));
                alert('Contact deleted successfully!');
            } catch (error) {
                console.error('Error deleting contact:', error);
            }
        }
    };

    const handleEdit = (id) => {
        const contactToEdit = contacts.find(contact => contact.id === id);
        setEditContact(contactToEdit);
        setIsEditModalOpen(true);
    };

    const handleUpdateContact = async () => {
        if (editContact.replyNote && editContact.status) {
            try {
                const response = await axios.put(`/api/query/${editContact.id}`, editContact);
                setContacts(contacts.map(contact =>
                    contact.id === editContact.id ? response.data : contact
                ));
                setEditContact(null);
                setIsEditModalOpen(false);
                alert('Contact updated successfully!');
            } catch (error) {
                console.error('Error updating contact:', error);
            }
        } else {
            alert('Please fill out all fields.');
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditContact({ ...editContact, [name]: value });
    };

    return (
        <div className="table-container">
            <h1>Respond to the Query</h1>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Regarding For</th>
                        <th>Special Note</th>
                        <th>Phone</th>
                        <th>Reply Note</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.date}</td>
                            <td>{contact.problem}</td>
                            <td>{contact.specialNote}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.replyNote}</td>
                            <td>{contact.status}</td>
                            <td>
                                <button onClick={() => handleEdit(contact.id)} className="btn-edit-item">Edit</button>
                                <button onClick={() => handleDelete(contact.id)} className="btn-delete-item">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Contact Modal (Custom implementation) */}
            {isEditModalOpen && editContact && (
                <div className="custom-modal">
                    <div className="modal-content">
                        <h2>Edit Contact</h2>
                        <textarea
                            name="replyNote"
                            placeholder="Reply Note"
                            value={editContact.replyNote}
                            onChange={handleEditInputChange}
                        />
                        <select
                            name="status"
                            value={editContact.status}
                            onChange={handleEditInputChange}
                        >
                            <option value="Pending">Pending</option>
                            <option value="done">Done</option>
                        </select>
                        <div className="modal-actions">
                            <button className="btn-edit-item" onClick={handleUpdateContact}>Update Query</button>
                            <button className="btn-delete-item" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QueryList;
