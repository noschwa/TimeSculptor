import { useEffect, useState } from 'react'
import { redirect, BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header'
import AddEvent from './components/create'
import Events from './components/events'
import Login from './login';
import './App.css'
import dayjs from 'dayjs'
import { unstable_composeClasses } from '@mui/material';

// for testing purposes this is used to populate list initially
const initialEvents = [
  {
      id: "1",
      title: "Eat",
      dateAndTime: dayjs(new Date( 2023, 12, 24)),
      icon: "/assets/images/login.png",
      color: "#0073e6"
  },

  {
      id: "2",
      title: "Sleep",      
      dateAndTime: dayjs(new Date( 2023, 11, 16)),
      icon: "/assets/images/register.png",
      color: "#9b8bf4"
  },

]

function App() {
  // this useState dynamically updates our list of events
  // when a new event is added
  const [events, setEvents] = useState(initialEvents);
  const [loggedIn, setLoggedIn] = useState(true);

  const handleDeleteEvent = (targetId) => {
    setEvents(events.filter(event => event.id !== targetId));
  };

  const handleEditEvent = (updatedEvent) => {
    const index = events.findIndex((event) => event.id == updatedEvent.id)

    if (index !== -1) {
      const newEvents = [...events];
      newEvents[index] = updatedEvent;
      setEvents(newEvents);
    }
  };

  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn])

  // addEvent takes the array of events and updates it with the new event
  function addEvent(newEvent) {
    const oldEvents = [...events];
    oldEvents.push(newEvent);
    setEvents(oldEvents);
  }

  if (loggedIn) {
    // main display
    return (
      <div className='appContainer'>
        <Header />
        <AddEvent addEventFunction={addEvent} />
        <Events events={events} deleteEvent={handleDeleteEvent} editEvent={handleEditEvent} />
      </div>
    )
  } else {
    return <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
  }

}

export default App
