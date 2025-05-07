import React, {useState, useContext} from 'react'
import Header from '../components/Header'
import InformationTable from '../components/InformationTable'
import Input from '../components/UI/Input/Input'
import Button from '../components/UI/Button/Button'
import Select from '../components/UI/Select/Select'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import FilterButtons from '../components/UI/FilterButtons/FilterButtons'

const AdminGroupsPage = observer(() => {

  const {group} = useContext(Context);

  const navigate = useNavigate()

  const columns = [
    { key: "name", label: "Группа", isLink: true, urlKey: "numberUrl" },
    { key: "category", label: "Категория", isLink: false },
    { key: "teacher", label: "Преподаватель", isLink: true, urlKey: "teacherUrl" },
    { key: "dateOfStart", label: "Дата начала обучения", isLink: false },
    { key: "status", label: "Статус", isLink: false }
  ];
  const info = [
    { 
      group: "17A", 
      groupUrl: "https://example.com/class/17A", 
      category: "A", 
      teacher: "Иванов И. И.", 
      teacherUrl: "https://example.com/teacher/ivanov", 
      studentsCount: "15", 
      startDate: "06.11.2024" 
    },
    { 
      group: "18A", 
      groupUrl: "https://example.com/class/18A", 
      category: "A", 
      teacher: "Иванов И. И.", 
      teacherUrl: "https://example.com/teacher/ivanov", 
      studentsCount: "17", 
      startDate: "04.12.2024" 
    },
    { 
      group: "17B", 
      groupUrl: "https://example.com/class/17B", 
      category: "B", 
      teacher: "Петров П. П.", 
      teacherUrl: "https://example.com/teacher/ivanov", 
      studentsCount: "16", 
      startDate: "10.01.2025" 
    },
  ];


  const values =[
    {
      key: 'category',
      value: 'A'
    },
    {
      key: 'teacher',
      value: 'Иванов И. И.'
    }
  ]

  const sortGroups = (key, value) => {

    console.log(key, value);
    // Обновляем состояние selectedSort
    // setSelectedSort(prevSort => {
    //     // Проверяем, есть ли уже элемент с таким ключом
    //     const existingIndex = prevSort.findIndex(criteria => criteria.key === key);
        
    //     let newSort;
    //     if (existingIndex >= 0) {
    //         // Если элемент с таким ключом существует, обновляем его значение
    //         newSort = prevSort.map((criteria, index) => 
    //             index === existingIndex ? { key, value } : criteria
    //         );
    //     } else {
    //         // Если нет, добавляем новый критерий
    //         newSort = [...prevSort, { key, value }];
    //     }

    //     // Фильтруем группы по всем критериям с обновленным массивом
    //     // setGroups(info.filter(group => 
    //     //     newSort.every(criteria => group[criteria.key] === criteria.value)
    //     // ));

    //     return newSort; // Возвращаем новый массив в состояние
    // });
}

  return (
    <>
        <div className="horizontal-container">
            <InformationTable 
              columns={columns} 
              data={group.groups}
              numbered={true}
            />
            <div className="filter-container">
              <FilterButtons 
                title='Категория'
                filters={group.categories.map(elem => elem.value)}
                selected={group.selectedCategory}
                setSelected={group.setSelectedCategory.bind(group)}
              />
              <FilterButtons 
                title='Преподаватель'
                filters={group.teachers.map(elem => elem.fullName)}
                selected={group.selectedTeacher}
                setSelected={group.setSelectedTeacher.bind(group)}
              />
            </div>
        </div>
    </>
  )
})

export default AdminGroupsPage;
