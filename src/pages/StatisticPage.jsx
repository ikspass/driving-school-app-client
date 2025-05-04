import React from 'react'
import InformationTable from '../components/InformationTable';

export default function StatisticPage() {

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

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <p className="heading-text-2">Зачёты</p>
        <InformationTable columns={columns} data={info}/>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <p className="heading-text-2">Список занятий</p>
        <InformationTable columns={columns} data={info}/>
      </div>
    </div>
  )
}
