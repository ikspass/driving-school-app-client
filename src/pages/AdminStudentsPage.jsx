import React from 'react'
import InformationTable from '../components/InformationTable';

function AdminStudentsPage() {
  const columns = [
    { key: "fio", label: "ФИО", isLink: true, urlKey: "fioUrl" },
    { key: "group", label: "Группа", isLink: true,  urlKey: "groupUrl"},
    { key: "category", label: "Категория", isLink: false},
    { key: "instructor", label: "Инструктор", isLink: true, urlKey: "instructorUrl"},
  ];
  const data = [
    { 
      fio: "Кузьмина Полина Андреевна", 
      fioUrl: "", 
      group: "17A", 
      groupUrl: "A", 
      category: "A", 
      instructor: "Иванов И. И.", 
      instructorUrl: ""
    },
    { 
      fio: "Яковлев Константин Игоревич", 
      fioUrl: "", 
      group: "18B", 
      groupUrl: "A", 
      category: "B", 
      instructor: "Иванов И. И.", 
      instructorUrl: ""
    },
    { 
      fio: "Мельникова Татьяна Васильевна", 
      fioUrl: "", 
      group: "17A", 
      groupUrl: "A", 
      category: "A", 
      instructor: "Самойлов И. И.", 
      instructorUrl: ""
    },
    { 
      fio: "Белов Денис Викторович", 
      fioUrl: "", 
      group: "18B", 
      groupUrl: "A", 
      category: "B", 
      instructor: "Смирнов И. И.", 
      instructorUrl: ""
    },
    { 
      fio: "Петров Андрей Андреевич", 
      fioUrl: "", 
      group: "-", 
      groupUrl: "A", 
      category: "B", 
      instructor: "-", 
      instructorUrl: ""
    },
    
  ];

  return (
    <div>
      <InformationTable columns={columns} data={data}/>
    </div>
  )
}

export default AdminStudentsPage;