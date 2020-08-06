import React, { useState, useCallback, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import Select from '../../components/Select';

import './styles.css';
import Input from '../../components/Input';
import api from '../../services/api';


const TeacherList: React.FC = () => {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    
    const searchTeachers = useCallback( async (event: FormEvent) => {
        event?.preventDefault();


        const response = await api.get('/classes', {
             params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);


    }, [subject, time, week_day]);

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes sao os proffys disponiveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>

                <Select 
                    name="subject" 
                    label="Materia"
                    value={subject}
                    onChange={e => { setSubject(e.target.value)}}
                    options={[
                        { value: 'Artes', label: 'Artes'},
                        { value: 'Historia', label: 'Historia'},
                        { value: 'Matematica', label: 'Matematica'},
                        { value: 'Ingles', label: 'Ingles'},
                        { value: 'Portugues', label: 'Portugues'},
                        { value: 'Geografia', label: 'Geografia'},
                        { value: 'Biologia', label: 'Biologia'},
                        { value: 'Fisica', label: 'Fisica'},
                        { value: 'Quimica', label: 'Quimica'},
                        { value: 'Educacao Fisica', label: 'Educacao Fisica'},
                    ]}
                    
                    />

                    <Select 
                    name="week_day" 
                    label="Dia da semana"
                    value={week_day}
                    onChange={e => { setWeekDay(e.target.value)}}
                    options={[
                        { value: '0', label: 'Domingo'},
                        { value: '1', label: 'Segunda-Feira'},
                        { value: '2', label: 'Terca-Feira'},
                        { value: '3', label: 'Quarta-Feira'},
                        { value: '4', label: 'Quinta-Feira'},
                        { value: '5', label: 'Sexta'},
                        { value: '6', label: 'Sabado'},
                    ]}
                    
                    />

                    <Input type="time"
                     name="time" 
                     label="Hora"  
                    value={time}
                    onChange={e => { setTime(e.target.value) }}
                    />

                    <button type="submit">Buscar</button>

                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
                
            </main>
        </div>
    );
};

export default TeacherList;