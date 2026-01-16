import { uniqBy } from 'lodash'

export const getUserPositionByCostCenters = (costCenters) => {
  let division = []
  let section = []
  let department = []
  costCenters?.forEach((item) => {
    if (item?.division?.id) {
      division.push(item?.division)
    }
    if (item?.section?.id) {
      section.push(item?.section)
    }
    if (item?.department?.id) {
      department.push(item?.department)
    }
  })
  return {
    division: uniqBy(division, 'id'),
    section: uniqBy(section, 'id'),
    department: uniqBy(department, 'id'),
  }
}
