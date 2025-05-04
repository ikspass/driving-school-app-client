import React from 'react'
import Header from './Header';
import ButtonBack from './UI/ButtonBack/ButtonBack';
import DescriptionTable from './DescriptionTable';
import Button from './UI/Button/Button';
import InformationTable from './InformationTable';
import Footer from './Footer';

function AdminGroupInfo() {
    const arr1 = [
        {
            key: 'Категория',
            value: 'B',
        },
        {
            key: 'Преподаватель',
            value: 'Иванов И. И.',
            link: '#'
        },
        {
            key: 'Количество учащихся',
            value: '17',
        },
        {
            key: 'Дата начала обучения',
            value: '10.06.2024',
        },
        {
            key: 'Дата планового экзамена',
            value: '16.12.2024',
        },
    ]

    const columns = [
        { key: "student", label: "ФИО", isLink: true, urlKey: "studentUrl" },
        { key: "instructor", label: "Инструктор", isLink: false },
        { key: "z1", label: "Зачёт 1"},
        { key: "z2", label: "Зачёт 2"},
        { key: "z3", label: "Зачёт 3"},
      ];
      const info = [
        { 
          student: "Рычкова Полина Андреевна", 
          studentUrl: "#",
          instructor: "Иванов И. И.", 
          z1: "В будущем", 
          z2: "В будущем", 
          z3: "В будущем"
        },
        { 
          student: "Мелихов Даниил Олегович", 
          studentUrl: "#",
          instructor: "Федоров Ф. Ф.", 
          z1: "В будущем", 
          z2: "В будущем", 
          z3: "В будущем"
        },
        { 
          student: "Нагорный Герман Антонович", 
          studentUrl: "#",
          instructor: "Петров П. П.", 
          z1: "В будущем", 
          z2: "В будущем", 
          z3: "В будущем"
        },
        
      ];
  return (
    <>
        <Header />
        <div className="main-container">
            <ButtonBack />
            <div>
                <p className="heading-text-2">Группа 17B</p>
                <div className="horizontal-container">
                    <DescriptionTable value={arr1}/>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        <Button>Назначить преподавателя</Button>
                        <Button>Добавить запись</Button>
                    </div>
                </div>
                <InformationTable columns={columns} data={info}/>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default AdminGroupInfo;