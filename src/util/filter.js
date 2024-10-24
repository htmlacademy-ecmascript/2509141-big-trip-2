import dayjs from 'dayjs';
import { FilterType } from '../const';


export default {
  [FilterType.EVERYTHING]: (waypoints) => waypoints,
  [FilterType.PRESENT]: (waypoints) => waypoints.filter((waypoint) => (dayjs().isAfter(waypoint['date_from']) && dayjs().isBefore(waypoint['date_to']))),
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => dayjs().isBefore(waypoint['date_from'])),
  [FilterType.PAST]: (waypoints) => waypoints.filter((waypoint) => dayjs().isAfter(waypoint['date_to'])),
};
