import dayjs from 'dayjs';
import { FilterType } from '../const';


export default {
  [FilterType.EVERYTHING]: (waypoints) => waypoints,
  [FilterType.PRESENT]: (waypoints) => waypoints.filter((waypoint) => (dayjs().isAfter(waypoint.dateFrom) && dayjs().isBefore(waypoint.dateTo))),
  [FilterType.FUTURE]: (waypoints) => waypoints.filter((waypoint) => dayjs().isBefore(waypoint.dateFrom)),
  [FilterType.PAST]: (waypoints) => waypoints.filter((waypoint) => dayjs().isAfter(waypoint.dateTo)),
};
