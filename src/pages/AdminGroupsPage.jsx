import React, {useState} from 'react'
import Header from '../components/Header'
import InformationTable from '../components/InformationTable'
import Input from '../components/UI/Input/Input'
import Button from '../components/UI/Button/Button'
import Select from '../components/UI/Select/Select'

const AdminGroupsPage = () => {
  const columns = [
    { key: "group", label: "Группа", isLink: true, urlKey: "numberUrl" },
    { key: "category", label: "Категория", isLink: false },
    { key: "teacher", label: "Учитель", isLink: true, urlKey: "teacherUrl" },
    { key: "studentsCount", label: "Количество студентов", isLink: false },
    { key: "startDate", label: "Дата начала", isLink: false }
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

  const [selectedSort, setSelectedSort] = useState([])

  const [groups, setGroups] = useState(info)

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
    setSelectedSort(prevSort => {
        // Проверяем, есть ли уже элемент с таким ключом
        const existingIndex = prevSort.findIndex(criteria => criteria.key === key);
        
        let newSort;
        if (existingIndex >= 0) {
            // Если элемент с таким ключом существует, обновляем его значение
            newSort = prevSort.map((criteria, index) => 
                index === existingIndex ? { key, value } : criteria
            );
        } else {
            // Если нет, добавляем новый критерий
            newSort = [...prevSort, { key, value }];
        }

        // Фильтруем группы по всем критериям с обновленным массивом
        setGroups(info.filter(group => 
            newSort.every(criteria => group[criteria.key] === criteria.value)
        ));

        return newSort; // Возвращаем новый массив в состояние
    });
}

  return (
    <>
        <div className="horizontal-container">
            <InformationTable columns={columns} data={groups}/>
            <div className="content-container" style={{width: '400px'}}>

              <Select 
                value={selectedSort.find(item => item.key === 'category')?.value || ''}
                onChange={sortGroups}
                defaultValue='Категория'
                sortKey='category'
                options={[ 'A', 'B', 'C' ]}
              />

              <Select 
                value={selectedSort.find(item => item.key === 'teacher')?.value || ''}
                onChange={sortGroups}
                defaultValue='Преподаватель'
                sortKey='teacher'
                options={[ 'Иванов И. И.', 'Петров П. П.', 'Cидоров С. С.' ]}
              />

              <Button onClick={() => { setSelectedSort([]); setGroups(info)}}>Отменить фильтр</Button>
            </div>
        </div>
    </>
  )
}

export default AdminGroupsPage;
