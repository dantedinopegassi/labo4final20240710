import React, { useState, useEffect } from 'react';
import Scheduler, { SchedulerData, ViewTypes } from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

const SchedulerComponent = () => {
  const [schedulerData, setSchedulerData] = useState(new SchedulerData(new Date(), ViewTypes.Week));
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('/asignaciones');
      const data = response.data.map(asignacion => ({
        id: asignacion.id,
        start: format(parseISO(asignacion.hora_inicio), 'yyyy-MM-dd HH:mm:ss'),
        end: format(parseISO(asignacion.hora_fin), 'yyyy-MM-dd HH:mm:ss'),
        resourceId: asignacion.aula_id,
        title: asignacion.materia_id,
      }));
      setEvents(data);
      schedulerData.setEvents(data);
      setSchedulerData(schedulerData);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  return (
    <div>
      <Scheduler schedulerData={schedulerData} />
    </div>
  );
};

export default SchedulerComponent;
