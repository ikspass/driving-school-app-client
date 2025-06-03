import React, { useState, useContext, useEffect } from "react";
import { ReactComponent as MainIcon } from "../styles/svg/main.svg";
import { ReactComponent as StaffIcon } from "../styles/svg/staff.svg";
import { ReactComponent as StudentIcon } from "../styles/svg/students.svg";
import { ReactComponent as ScheduleIcon } from "../styles/svg/schedule.svg";
import { ReactComponent as MaterialsIcon } from "../styles/svg/materials.svg";
import { Link } from "react-router-dom";
import {
  INSTRUCTOR_ROUTE,
  MATERIALS_ROUTE,
  SCHEDULE_ROUTE,
  STAFF_ROUTE,
  STUDENTS_ROUTE,
  TEACHER_ROUTE,
} from "../utils/consts";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { fetchUserById } from "../http/adminAPI";

const InstructorNavigation = observer(() => {
  const { userStore } = useContext(Context);
  const [user, setUser] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserById(userStore.user.id);
        setUser(userData);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Link to={SCHEDULE_ROUTE} className="navigation-item">
        <ScheduleIcon />
        <p className="normal-text">Расписание</p>
      </Link>
      <Link to={STUDENTS_ROUTE} className="navigation-item">
        <StudentIcon />
        <p className="normal-text">Курсанты</p>
      </Link>
      <Link to={STAFF_ROUTE} className="navigation-item">
        <StaffIcon />
        <p className="normal-text">Персонал</p>
      </Link>
      <Link to={`${INSTRUCTOR_ROUTE}/${user.instructor.id}`} className="navigation-item">
        <MaterialsIcon />
        <p className="normal-text">Мои данные</p>
      </Link>
    </>
  );
});

export default InstructorNavigation;
