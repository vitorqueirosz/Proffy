import React, { useState, useCallback, useEffect } from 'react';

import PageHeader from '../../components/PageHeader';

import { BorderlessButton } from 'react-native-gesture-handler';

import TeacherItem, { Teacher } from '../../components/TeacherItem';

import { Feather } from '@expo/vector-icons';

import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

import {
    Container,
    ScrollView,
    SearchForm,
    SubjectLabelText,
    Input,
    InputBlock,
    InputGroup,
    SubmitButton,
    SubmitButtonText  } from './styles';


const TeacherList: React.FC = () => {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [teachers, setTeachers] = useState([]);

    const [favorites, setFavorites] = useState<number[]>([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekday] = useState('');
    const [time, setTime] = useState('');

    const loadFavorites = useCallback(() => {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);

                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                });

                setFavorites(favoritedTeachersIds);
            }
        })
    }, []);

    const handleToggleFiltersVisible = useCallback(() => {
        setIsFiltersVisible(!isFiltersVisible);
    }, [isFiltersVisible]);


    const handleFilterSubmit = useCallback( async () => {
        loadFavorites();

        const response = await api.get('/classes', {
             params: {
                subject,
                week_day,
                time
            }
        });

        setIsFiltersVisible(false);
        console.log(response.data)
        setTeachers(response.data);

    }, [subject, week_day, time]);

    return (
        <Container>
            <PageHeader
            title="Proffys disponiveis"
            headerRight={(
                <BorderlessButton onPress={handleToggleFiltersVisible}>
                <Feather name="filter" size={20} color="#fff"/>

                </BorderlessButton>
            )}>

                {isFiltersVisible && (
                    <SearchForm>
                        <SubjectLabelText>Materia</SubjectLabelText>
                        <Input
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Qual a materia?"
                            placeholderTextColor="#c1bccc"
                        />

                        <InputGroup>
                            <InputBlock>
                                <SubjectLabelText>Dia da Semana</SubjectLabelText>
                                <Input

                                    value={week_day}
                                    onChangeText={text => setWeekday(text)}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </InputBlock>

                            <InputBlock>
                                <SubjectLabelText>Horario</SubjectLabelText>
                                <Input
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual o horario?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </InputBlock>
                        </InputGroup>

                        <SubmitButton onPress={handleFilterSubmit}>
                            <SubmitButtonText>Filtrar</SubmitButtonText>
                        </SubmitButton>
                    </SearchForm>
                )}
            </PageHeader>


            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >

                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                        key={teacher.id}
                        teacher={teacher}
                        favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}
            </ScrollView>

        </Container>
    );
};

export default TeacherList;
