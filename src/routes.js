import GroupsPage from "./pages/GroupsPage"
import AdminPage from "./pages/AdminPage"
import StaffPage from "./pages/StaffPage"
import StudentsPage from "./pages/StudentsPage"
import AuthPage from "./pages/AuthPage"
import GroupPage from "./pages/GroupPage"
import InstructorPage from "./pages/InstructorPage"
import SchedulePage from "./pages/SchedulePage"
import StatisticPage from "./pages/StatisticPage"
import StudentPage from "./pages/StudentPage"
import TeacherPage from "./pages/TeacherPage"
import { ADMIN_ROUTE, GROUPS_ROUTE, INSTRUCTOR_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SCHEDULE_ROUTE, STAFF_ROUTE, STATISTIC_ROUTE, STUDENT_ROUTE, STUDENTS_ROUTE, TEACHER_ROUTE, ADMINAUTH_ROUTE, GROUP_ROUTE, LECTURE_ROUTE, DRIVING_ROUTE, TEST_ROUTE, ERROR_PAGE, LANDING_ROUTE } from "./utils/consts"
import AdminAuthPage from "./pages/admin/AdminAuthPage"
import LecturePage from "./pages/LecturePage"
import DrivingPage from "./pages/DrivingPage"
import TestPage from "./pages/TestPage"
import ErrorPage from "./pages/ErrorPage"
import LandingPage from "./pages/LandingPage"

const studentStaffRoutes = [
  {
    path: SCHEDULE_ROUTE,
    Component: SchedulePage
  },
  {
    path: STATISTIC_ROUTE,
    Component: StatisticPage
  },
  {
    path: ERROR_PAGE,
    Component: ErrorPage
  },
  {
    path: LANDING_ROUTE,
    Component: LandingPage
  },
];

const staffAdminRoutes = [
  {
    path: GROUPS_ROUTE,
    Component: GroupsPage
  },
  {
    path: STAFF_ROUTE,
    Component: StaffPage
  },
  {
    path: GROUP_ROUTE + '/:id',
    Component: GroupPage
  },
  {
    path: STUDENT_ROUTE + '/:id',
    Component: StudentPage
  },
  {
    path: STUDENTS_ROUTE,
    Component: StudentsPage
  },
  {
    path: INSTRUCTOR_ROUTE + '/:id',
    Component: InstructorPage
  },
  {
    path: TEACHER_ROUTE + '/:id',
    Component: TeacherPage
  },
  {
    path: LECTURE_ROUTE + '/:id',
    Component: LecturePage
  },
  {
    path: DRIVING_ROUTE + '/:id',
    Component: DrivingPage
  },
  {
    path: TEST_ROUTE + '/:id',
    Component: TestPage
  },
  {
    path: ERROR_PAGE,
    Component: ErrorPage
  }
];

const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage
  },
  {
    path: LANDING_ROUTE,
    Component: LandingPage
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: AuthPage
  },
  {
    path: LANDING_ROUTE,
    Component: LandingPage
  },
  {
    path: REGISTRATION_ROUTE,
    Component: AuthPage
  },
  {
    path: ADMINAUTH_ROUTE,
    Component: AdminAuthPage
  }
];

export const studentRoutes = [
  {
    path: STUDENT_ROUTE + '/:id',
    Component: StudentPage
  },
  {
    path: INSTRUCTOR_ROUTE + '/:id',
    Component: InstructorPage
  },
  {
    path: TEACHER_ROUTE + '/:id',
    Component: TeacherPage
  },
  {
    path: GROUP_ROUTE + '/:id',
    Component: GroupPage
  },
  {
    path: LECTURE_ROUTE + '/:id',
    Component: LecturePage
  },
  {
    path: DRIVING_ROUTE + '/:id',
    Component: DrivingPage
  },
  {
    path: TEST_ROUTE + '/:id',
    Component: TestPage
  }
]

export const initialRoutes = {
  admin: ADMIN_ROUTE,
  teacher: SCHEDULE_ROUTE,
  student: SCHEDULE_ROUTE,
  public: LANDING_ROUTE,
};

export const getRoutesByRole = (role) => {
  switch (role) {
    case 'admin':
      return [...adminRoutes, ...staffAdminRoutes, ...studentStaffRoutes];
    case 'teacher':
      return [...staffAdminRoutes, ...studentStaffRoutes];
    case 'instructor':
      return [...staffAdminRoutes, ...studentStaffRoutes];
    case 'student':
      return [...studentStaffRoutes, ...studentRoutes];
    default:
      return publicRoutes;
  }
};