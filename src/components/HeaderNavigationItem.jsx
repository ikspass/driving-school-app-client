import { ReactComponent as MainIcon } from '../styles/svg/main.svg';
import { ReactComponent as StatisticsIcon } from '../styles/svg/statistics.svg';
import { ReactComponent as ScheduleIcon } from '../styles/svg/schedule.svg';
import { ReactComponent as MaterialsIcon } from '../styles/svg/materials.svg';

const HeaderNavigationItem = ({title}) => {
    return (
        <a href="#" className="navigation-item">
            <StatisticsIcon/>
            <p className="normal-text">{title}</p>
      </a>
    )
}

export default HeaderNavigationItem