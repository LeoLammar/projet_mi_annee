"use client";

import { format, addWeeks, subWeeks, startOfWeek, addDays, isSameDay, parse } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

interface Event {
  date: string;
  slot: string; // Format: "HH:mm"
  title: string;
  description: string;
  duration: number; // Durée en minutes
}

export default function Calendar() {
  const today: Date = new Date();

  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Event>({
  date: format(today, "yyyy-MM-dd"),
  slot: "08:00",
  title: "",
  description: "",
  duration: 60,
});

useEffect(() => {
  async function fetchEvents() {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:5000/users/${userId}/calendar`);
      const data = await response.json();
      setEvents(data.calendar || []);
    } catch (error) {
      console.error("Erreur de chargement :", error);
    }
  }

  fetchEvents();
}, []);
  
  
    const addEvent = async (date: string, slot: string, duration: number, title: string, description: string) => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Utilisateur non connecté !");
        return;
      }
    
      const newEvent = { date, slot, title, description, duration };
    
      try {
        const response = await fetch(`http://localhost:5000/users/${userId}/calendar`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEvent),
        });
    
        const result = await response.json();
        if (result.success) {
          setEvents([...events, newEvent]);
        } else {
          console.error("Erreur :", result.message);
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };
    
  
    const deleteEvent = async (eventToDelete: Event) => {
      const userId = localStorage.getItem("userId"); // Récupération de l'ID utilisateur
      if (!userId) {
        alert("Utilisateur non connecté !");
        return;
      }
    
      try {
        const response = await fetch(`http://localhost:5000/users/${userId}/calendar?date=${eventToDelete.date}&slot=${eventToDelete.slot}`, { 
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        });
    
        const result = await response.json();
    
        if (result.success) {
          setEvents(events.filter(event => !(event.date === eventToDelete.date && event.slot === eventToDelete.slot)));
          setSelectedEvent(null);
        } else {
          console.error("Erreur lors de la suppression :", result.message);
        }
      } catch (error) {
        console.error("Erreur lors de la requête de suppression :", error);
      }
    };
    
  
  
  
  
  
  

  const [currentStartOfWeek, setCurrentStartOfWeek] = useState<Date>(
    startOfWeek(today, { weekStartsOn: 1 })
  );
    const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const daysOfWeek: Date[] = Array.from({ length: 6 }, (_, i) =>
    addDays(currentStartOfWeek, i)
  );

  // Création des créneaux horaires toutes les heures
  const timeSlots: string[] = Array.from({ length: 12 }, (_, i) => {
    const startHour = 8 + i; // Les heures commencent à 8h
    return `${startHour.toString().padStart(2, "0")}:00`;
  });

  const navigateWeek = (direction: "next" | "prev") => {
    const newStart =
      direction === "next"
        ? addWeeks(currentStartOfWeek, 1)
        : subWeeks(currentStartOfWeek, 1);
    setCurrentStartOfWeek(newStart);
  };

  const resetToCurrentWeek = () => {
    setCurrentStartOfWeek(startOfWeek(today, { weekStartsOn: 1 }));
  };

  /*const deleteEvent = (eventToDelete: Event) => {
    setEvents(events.filter((event) => event !== eventToDelete));
    setSelectedEvent(null);
  };*/

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    // Vérifier si la date est valide avant de mettre à jour l'état
    if (!isNaN(selectedDate.getTime())) {
      setCurrentStartOfWeek(startOfWeek(selectedDate, { weekStartsOn: 1 }));
    }
  };

  // Vérification de la validité de la date avant de l'afficher
  const safeFormatDate = (date: Date) => {
    return !isNaN(date.getTime()) ? format(date, "MMMM yyyy", { locale: fr }) : "Semaine invalide";
  };

  return (

    <div className="p-4">
      <Header/>
      
      {/* Navigation de la semaine */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Ajouter un événement
      </button>
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigateWeek("prev")} className="text-xl">
          {"←"}
        </button>
        <h2 className="text-2xl font-bold">
          {safeFormatDate(currentStartOfWeek)}
        </h2>
        <button onClick={() => navigateWeek("next")} className="text-xl">
          {"→"}
        </button>
      </div>

      {/* Bouton pour revenir à la semaine actuelle */}
      <div className="text-center mb-4">
        {/*<button
          onClick={resetToCurrentWeek}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mr-2"
        >
          Revenir à la semaine en cours
        </button>*/}

        {/* Sélecteur de date */}
        <input
          type="date"
          onChange={handleDateChange}
          className="border p-2 rounded"
        />
      </div>

      {/* Tableau de l'emploi du temps */}
      <div className="grid grid-cols-7">
        <div className="text-center font-bold bg-gray-300 p-2">Horaire</div>
        {daysOfWeek.map((day, index) => {
          const dayName = format(day, "iiii", { locale: fr });
          const dayDate = format(day, "dd");
          const isToday = isSameDay(day, today);

          return (
            <div
              key={`day-${index}`}
              className={`text-center font-bold p-2 ${
                isToday ? "bg-gray-400 text-white" : "bg-gray-200"
              }`}
            >
              {`${dayName} ${dayDate}`}
            </div>
          );
        })}

        {timeSlots.map((time, rowIndex) => (
          <React.Fragment key={`timeSlot-${rowIndex}`}>
            <div className="text-center font-medium bg-gray-100 p-4 h-16">
              {time}
            </div>

            {/* Créneaux horaires */}
            {daysOfWeek.map((day, colIndex) => {
              const matchingEvents = events.filter(
                (e) =>
                  e.date === format(day, "yyyy-MM-dd") &&
                  parse(e.slot, "HH:mm", new Date()).getHours() === parse(time, "HH:mm", new Date()).getHours()
              );

              const isTodayColumn = isSameDay(day, today);

              return (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={`relative border p-0 ${
                    isTodayColumn ? "bg-gray-300" : "bg-gray-50"
                  }`}
                >
                  {matchingEvents.map((event, index) => {
                    const startMinutes =
                      parse(event.slot, "HH:mm", new Date()).getMinutes();
                    const height = (event.duration / 60) * 102.5; //on fait *102.5 au lieu de *100 pour gérer le petit espace entre chaque cours

                    return (
                      <div
                        key={index}
                        className="absolute left-0 right-0 bg-blue-500 text-white rounded p-2 text-sm z-10 flex flex-col justify-center items-center"
                        style={{
                          top: `${(startMinutes / 60) * 100}%`,
                          height: `${height}%`,
                        }}
                        onClick={() => setSelectedEvent(event)}
                      >
                        <p className="font-bold">{event.title}</p>
                        <p>{event.description}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      {showForm && (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Nouvel Événement</h2>

      <label className="block mb-2">
        Date :
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          className="border p-2 w-full rounded"
        />
      </label>

      <label className="block mb-2">
        Heure :
        <input
          type="time"
          value={newEvent.slot}
          onChange={(e) => setNewEvent({ ...newEvent, slot: e.target.value })}
          className="border p-2 w-full rounded"
        />
      </label>

      <label className="block mb-2">
        Durée (minutes) :
        <input
          type="number"
          value={newEvent.duration}
          onChange={(e) => setNewEvent({ ...newEvent, duration: Number(e.target.value) })}
          className="border p-2 w-full rounded"
        />
      </label>

      <label className="block mb-4">
        Description :
        <input
          type="text"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          className="border p-2 w-full rounded"
        />
      </label>

      <label className="block mb-2">
        Titre :
        <input
          type="text"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          className="border p-2 w-full rounded"
        />
      </label>


      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setShowForm(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Annuler
        </button>
        <button
          onClick={async () => {
            await addEvent(newEvent.date, newEvent.slot, newEvent.duration, newEvent.title, newEvent.description);
            setShowForm(false);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Ajouter
        </button>
      </div>
    </div>
  </div>
)}


      {/* Détails de l'événement sélectionné */}
      {selectedEvent && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{selectedEvent.title}</h2>
            <p className="mb-2">
              <strong>Date:</strong> {selectedEvent.date}
            </p>
            <p className="mb-2">
              <strong>Créneau:</strong> {selectedEvent.slot}
            </p>
            <p className="mb-2">
              <strong>Durée:</strong> {selectedEvent.duration} minutes
            </p>
            <p className="mb-4">
              <strong>Description:</strong> {selectedEvent.description}
            </p>
            <button
              onClick={() => deleteEvent(selectedEvent)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition mr-2"
            >
              Supprimer
            </button>
            <button
              onClick={() => setSelectedEvent(null)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
      <Footer/>
    </div>
    
  );
}
