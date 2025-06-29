import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { GROUP_ROUTE, TEACHER_ROUTE } from "../../utils/consts";
import {
  fetchGroups,
  fetchCategories,
  fetchTeachers,
} from "../../http/adminAPI";
import InformationTable from "../../components/InformationTable";
import MultipleFilterButtons from "../../components/UI/MultipleFilterButtons/MultipleFilterButtons";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/Modal";
import CreateGroup from "../../components/admin/CreateGroup";

const AdminGroupsPage = observer(() => {
  const [teachers, setTeachers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [createGroupModal, setCreateGroupModal] = useState(false);

  const fetchData = async () => {
    try {
      const teachers = await fetchTeachers();
      setTeachers(teachers);
      const groups = await fetchGroups();
      setGroups(groups);
      const categories = await fetchCategories();
      setCategories(categories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState([]);

  const filteredGroups = groups.filter((group) => {
    const matchesCategory =
      selectedCategory.length > 0
        ? selectedCategory.some((cat) => cat.id === group.categoryId)
        : true;
    const matchesTeacher =
      selectedTeacher.length > 0
        ? selectedTeacher.some((teacher) => teacher.id === group.teacherId)
        : true;
    return matchesCategory && matchesTeacher;
  });

  const columns = [
    {
      key: "name",
      label: "Номер",
      isLink: true,
      navigateTo: (row) => `${GROUP_ROUTE}/${row.id}`,
    },
    { key: "category.value", label: "Категория", isLink: false },
    {
      key: "teacher.user.fullName",
      label: "Преподаватель",
      isLink: true,
      navigateTo: (row) => `${TEACHER_ROUTE}/${row.teacher.id}`,
    },
    { key: "dateOfStart", label: "Дата начала обучения", isLink: false },
  ];

  if (loading) {
    return <div className="small-text">Загрузка...</div>;
  }

  return (
    <div className="filter-container">
      <p className="heading-text-2">Группы</p>
      <Modal
        children={<CreateGroup onClose={() => {
          setCreateGroupModal(false)
          fetchData();
        }}/>}
        isOpen={createGroupModal}
        onClose={() => {
          setCreateGroupModal(false);
        }}
      />
      <div
        className="horizontal-container"
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        <InformationTable
          style={{ width: "100%" }}
          columns={columns}
          data={filteredGroups}
          numbered={true}
        />
        <div className="content-container" style={{ width: "400px" }}>
          <MultipleFilterButtons
            title="Категория"
            filters={categories.map((elem) => ({
              id: elem.id,
              value: elem.value,
            }))}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <MultipleFilterButtons
            title="Преподаватель"
            filters={teachers.map((elem) => ({
              id: elem.id,
              value: elem.user.fullName,
            }))}
            selected={selectedTeacher}
            setSelected={setSelectedTeacher}
          />
        </div>
        <div className="button-container">
          <Button className="outline" onClick={() => setCreateGroupModal(true)}>
            Добавить группу
          </Button>
        </div>
      </div>
    </div>
  );
});

export default AdminGroupsPage;
