import React from 'react';

import PageHeader from '../../components/PageHeader';
import { Container } from './styles';

const TeacherList: React.FC = () => {
    return (
        <Container>
            <PageHeader title="Proffys disponiveis" />
        </Container>
    );
};

export default TeacherList;